
const URL_Users = 'https://dummyjson.com/users';
const URL_Products = 'https://dummyjson.com/products';


async function buscarUsuarios() {
  const container = document.querySelector("#user-container");


  try {
    const res = await fetch(URL_Users);


    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }


    const { users } = await res.json();


    const usuariosTratados = users
      .filter(usuario => usuario.gender === 'male')
      .map(usuario => ({
        id: usuario.id,
        nome: usuario.firstName,
        nome_completo: `${usuario.firstName} ${usuario.lastName}`,
        tel: usuario.phone,
        email: usuario.email,
        cidade: usuario.address?.city || 'Não informado',
        empresa: usuario.company?.name || 'Não informado',
        banco: usuario.bank?.cardType || 'Não informado',
        genero: usuario.gender,
        imagem: usuario.image,
        departamento: usuario.company?.department || 'Não informado'
      }));


    container.innerHTML = usuariosTratados.map(u => `
      <div class="card">
        <img src="${u.imagem}" alt="${u.nome_completo}" title="${u.nome_completo}">
        <h3>${u.nome_completo}</h3>
        <h4>${u.empresa}</h4>
        <p>${u.tel}</p>
        <p><a href="mailto:${u.email}">${u.email}</a></p>
        <p>${u.departamento}</p>
        <p>${u.cidade}</p>
        <p>${u.banco}</p>
      </div>
    `).join('');


    console.log("Usuários tratados:", usuariosTratados);


  } catch (erro) {
    console.error('Falha ao buscar usuários:', erro.message);
    container.innerHTML = `
      <p class="status" style="color: #dc3545;">
        Falha ao carregar usuários: ${erro.message}
      </p>
    `;
  }
}


async function buscarProdutos() {
  const container = document.querySelector("#product-container");


  try {
    const res = await fetch(URL_Products);


    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }


    const { products } = await res.json();


    const produtosTratados = products
      .filter(produto => produto.rating >= 4.0)
      .map(produto => ({
        id: produto.id,
        titulo: produto.title,
        categoria: produto.category,
        preco: produto.price,
        avaliacao: produto.rating,
        marca: produto.brand || 'Não informado',
        largura: produto.dimensions?.width || 'Não informado',
        codigoBarras: produto.meta?.barcode || 'Não informado',
        imagem: produto.thumbnail
      }));


    container.innerHTML = produtosTratados.map(p => `
      <div class="card">
        <img src="${p.imagem}" alt="${p.titulo}" title="${p.titulo}">
        <h3>${p.titulo}</h3>
        <h4>Marca: ${p.marca}</h4>
        <p class="preco">$ ${p.preco.toFixed(2)}</p>
        <p>Categoria: ${p.categoria}</p>
        <p>Avaliação: ⭐ ${p.avaliacao}</p>
        <p>Largura: ${p.largura} cm</p>
        <p>Cód. Barras: ${p.codigoBarras}</p>
      </div>
    `).join('');


    console.log("Produtos tratados:", produtosTratados);


  } catch (erro) {
    console.error('Falha ao buscar produtos:', erro.message);
    container.innerHTML = `
      <p class="status" style="color: #dc3545;">
        Falha ao carregar produtos: ${erro.message}
      </p>
    `;
  }
}


buscarUsuarios();
buscarProdutos();


