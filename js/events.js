


// Função assíncrona que busca a lista de eventos da API e exibe as informações na página.
async function fetchEventos() {
  try {
    // Faz uma requisição para a API para obter a lista de eventos.
    const response = await fetch('https://soundgarden-api.vercel.app/events');
    const data = await response.json(); // Converte a resposta em um objeto JavaScript.

    // Seleciona o container onde os eventos serão exibidos.
    const container = document.querySelector('.container.d-flex');

    // Cria um artigo HTML para cada evento e adiciona ao container.
    container.innerHTML = data.map(evento => `
      <article class="evento card p-5 m-3">
        <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleDateString()}</h2>
        <h4>${evento.attractions.join(', ')}</h4>
        <p>${evento.description}</p>
        <a href="eventos.html?id=${evento._id}" class="btn btn-primary">reservar ingresso</a>
      </article>
    `).join('');

  } catch (error) {
    console.error(error); // Exibe qualquer erro que ocorra no console do navegador.
  }
}

// Chama a função fetchEventos para buscar a lista de eventos e exibi-los na página.
fetchEventos();


// Obtém o parâmetro "id" da URL
const params = new URL(document.location).searchParams;
const idEvent = params.get("id");


const reservarIngresso = async (body, id) => {
  return fetch(`https://soundgarden-api.vercel.app/bookings`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.body;
  });
}

// Verifica se a variável "idEvent" existe e é verdadeira
if (idEvent) {
  // Imprime o valor da variável "idEvent" no console
  console.log(idEvent);
  
  // Seleciona o elemento com o id "fade" e define sua propriedade "display" como "block"
  fade.style.display = "block";
  
  // Seleciona o elemento com o id "modal" e define sua propriedade "display" como "block"
  modal.style.display = "block";

  // Seleciona o elemento com o id "form-reserva" e armazena-o na variável "reservarForm"
  const reservarForm = document.getElementById('form-reserva');

  // Adiciona um ouvinte de eventos para o evento "submit" no elemento "reservarForm"
  reservarForm.addEventListener("submit", async (e) => {
    // Previne o comportamento padrão do evento "submit"
    e.preventDefault();
    
    // Seleciona o elemento com o id "nome" e armazena o valor de seu campo "value" na variável "nome"
    const nome = document.getElementById("nome").value;
    
    // Seleciona o elemento com o id "email" e armazena o valor de seu campo "value" na variável "email"
    const email = document.getElementById("email").value;
    
    // Cria um objeto "body" com as informações necessárias para realizar a reserva
    const body = {
      "owner_name": nome,
      "owner_email": email,
      "number_tickets": 1,
      "event_id": idEvent
    };
    
    // Imprime o objeto "body", bem como as variáveis "nome" e "email" no console
    console.log(body, nome, email);
    
    try {
      // Chama a função "reservarIngresso" com os parâmetros "body" e "idEvent", aguardando sua conclusão
      await reservarIngresso(body, idEvent);
      
      // Exibe uma mensagem de alerta informando que a reserva foi realizada com sucesso
      alert("Reserva realizada com sucesso");
    
      // Redireciona o usuário para a página "index.html"
      window.location.replace("eventos.html");
    } catch (error) {
      // Exibe uma mensagem de alerta informando que ocorreu um erro ao realizar a reserva
      alert("error: " + error.data + "\nErro ao criar reserva. Tente Novamente");
    }
  });
}

