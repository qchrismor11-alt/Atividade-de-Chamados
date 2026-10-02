const listaChamados = document.querySelector("#lista-chamados");
const pesquisa = document.querySelector("#pesquisa");
const filtroPrioridade = document.querySelector("#filtro-prioridade");
const filtroStatus = document.querySelector("#filtro-status");

function mostrarChamados(lista) {
  listaChamados.innerHTML = "";

  if (lista.length === 0) {
    listaChamados.innerHTML = `
            <p class="sem-resultados">
                Nenhum chamado encontrado.
            </p>
        `;

    return;
  }

  lista.forEach((chamado) => {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
            <h2>${chamado.titulo}</h2>

            <p>
                <strong>ID:</strong>
                ${chamado.id}
            </p>

            <p>
                <strong>Usuário:</strong>
                ${chamado.usuario}
            </p>

            <p>
                <strong>Prioridade:</strong>
                <span class="prioridade ${classePrioridade(chamado.prioridade)}">
                    ${chamado.prioridade}
                </span>
            </p>

            <p>
                <strong>Status:</strong>
                ${chamado.status}
            </p>
        `;

    listaChamados.appendChild(card);
  });
}

function classePrioridade(prioridade) {
  if (prioridade === "Crítica") {
    return "critica";
  }

  if (prioridade === "Alta") {
    return "alta";
  }

  if (prioridade === "Média") {
    return "media";
  }

  return "baixa";
}

function filtrarChamados() {
  const nomePesquisado = pesquisa.value.toLowerCase();

  const prioridadeSelecionada = filtroPrioridade.value;

  const statusSelecionado = filtroStatus.value;

  const chamadosFiltrados = chamados.filter((chamado) => {
    const nomeCorresponde =
      chamado.usuario.toLowerCase().includes(nomePesquisado) ||
      chamado.titulo.toLowerCase().includes(nomePesquisado);

    const prioridadeCorresponde =
      prioridadeSelecionada === "" ||
      chamado.prioridade === prioridadeSelecionada;

    const statusCorresponde =
      statusSelecionado === "" || chamado.status === statusSelecionado;

    return nomeCorresponde && prioridadeCorresponde && statusCorresponde;
  });

  mostrarChamados(chamadosFiltrados);
}

pesquisa.addEventListener("input", filtrarChamados);

filtroPrioridade.addEventListener("change", filtrarChamados);

filtroStatus.addEventListener("change", filtrarChamados);

mostrarChamados(chamados);