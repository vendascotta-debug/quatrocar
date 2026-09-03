const FIPE_BASE = "https://brasilapi.com.br/api/fipe";

type FipeOption = { nome: string; valor: string };
type FipeModelo = { modelo: string; valor: string };

export type FipeCandidato = { codigo: string; nome: string };

export type FipeResultado =
  | { status: "ok"; valor: number; texto: string; mesReferencia: string; fipeCodigo: string; marcaCodigo: string; modeloCodigo: string; anoCodigo: string }
  | { status: "ambiguo"; candidatos: FipeCandidato[]; marcaCodigo: string }
  | { status: "nao_encontrado" };

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fipeGet<T>(path: string): Promise<T> {
  const res = await fetch(`${FIPE_BASE}${path}`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Fipe: falha ao consultar ${path}`);
  return res.json();
}

function encontrarMarca(marcas: FipeOption[], marcaVeiculo: string): FipeOption | null {
  const alvo = normalizar(marcaVeiculo);
  if (!alvo) return null;

  // Match exato do nome, ou do nome sem prefixo tipo "GM - Chevrolet" / "VW - Volkswagen".
  const semPrefixo = (nome: string) => normalizar(nome.split("-").pop() || nome);

  return (
    marcas.find((m) => normalizar(m.nome) === alvo) ||
    marcas.find((m) => semPrefixo(m.nome) === alvo) ||
    marcas.find((m) => semPrefixo(m.nome).includes(alvo) || alvo.includes(semPrefixo(m.nome))) ||
    null
  );
}

function pontuarModelo(nomeFipe: string, alvo: string[]) {
  const nomeNorm = normalizar(nomeFipe);
  let pontos = 0;
  for (const palavra of alvo) {
    if (palavra.length < 2) continue;
    if (nomeNorm.includes(palavra)) pontos += 1;
  }
  return pontos;
}

export async function buscarFipe(params: {
  marca: string;
  modelo: string;
  versao?: string | null;
  anoModelo?: number | null;
  combustivel?: string | null;
  modeloCodigoEscolhido?: string;
}): Promise<FipeResultado> {
  const marcas = await fipeGet<FipeOption[]>("/marcas/v1/carros");
  const marcaEncontrada = encontrarMarca(marcas, params.marca);
  if (!marcaEncontrada) return { status: "nao_encontrado" };

  const modelos = await fipeGet<FipeModelo[]>(`/veiculos/v1/carros/${marcaEncontrada.valor}`);

  let modeloEscolhido: FipeModelo | undefined;

  if (params.modeloCodigoEscolhido) {
    modeloEscolhido = modelos.find((m) => m.valor === params.modeloCodigoEscolhido);
  } else {
    const alvoPalavras = normalizar(`${params.modelo} ${params.versao ?? ""}`).split(" ");
    const ranqueados = modelos
      .map((m) => ({ m, pontos: pontuarModelo(m.modelo, alvoPalavras) }))
      .filter((r) => r.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos);

    if (ranqueados.length === 0) return { status: "nao_encontrado" };

    const melhor = ranqueados[0];
    const segundo = ranqueados[1];

    if (!segundo || melhor.pontos > segundo.pontos) {
      modeloEscolhido = melhor.m;
    } else {
      return {
        status: "ambiguo",
        marcaCodigo: marcaEncontrada.valor,
        candidatos: ranqueados.slice(0, 8).map((r) => ({ codigo: r.m.valor, nome: r.m.modelo })),
      };
    }
  }

  if (!modeloEscolhido) return { status: "nao_encontrado" };

  const anos = await fipeGet<FipeOption[]>(
    `/anos/v1/carros/${marcaEncontrada.valor}/${modeloEscolhido.valor}`
  );
  if (anos.length === 0) return { status: "nao_encontrado" };

  const anoAlvo = params.anoModelo ? String(params.anoModelo) : null;
  const combustivelAlvo = params.combustivel ? normalizar(params.combustivel) : null;

  const doAno = anoAlvo ? anos.filter((a) => a.valor.startsWith(anoAlvo)) : [];
  const listaCandidata = doAno.length > 0 ? doAno : anos;

  const anoEscolhido =
    (combustivelAlvo && listaCandidata.find((a) => normalizar(a.nome).includes(combustivelAlvo))) ||
    listaCandidata[0];

  const detalhes = await fipeGet<{
    valor: string;
    mesReferencia: string;
    codigoFipe: string;
  }>(`/detalhes/v1/carros/${marcaEncontrada.valor}/${modeloEscolhido.valor}/${anoEscolhido.valor}`);

  const valorNumerico = Number(detalhes.valor.replace(/[^\d,]/g, "").replace(",", "."));
  if (!valorNumerico || Number.isNaN(valorNumerico)) return { status: "nao_encontrado" };

  return {
    status: "ok",
    valor: valorNumerico,
    texto: detalhes.valor,
    mesReferencia: detalhes.mesReferencia,
    fipeCodigo: detalhes.codigoFipe,
    marcaCodigo: marcaEncontrada.valor,
    modeloCodigo: modeloEscolhido.valor,
    anoCodigo: anoEscolhido.valor,
  };
}
