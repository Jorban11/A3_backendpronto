


João Carlos Orban dos Santos - 818117293



 O sistema foi desenvolvido com o tema farmaceutico em mente, então fiz um microsserviço de usuario para poder logar no site e um microsserviço de medicamentos para registrar e atualizar novos produtos, ainda tem mais um microsserviço de barramento de eventos para filtrar respostas entre os usuarios e medicamentos.

 O microsserviço de usuario contém email, nome, senha e será disponibilizado um id aleatório para o cliente, as funçoes que são prioritárias ao microsserviço são de consulta pela chamada get, e registro pela chamada post. Como o sistema foca em login dos funcionarios da loja, alteraçoes e possivelmente exclusao de usuario deve ser tratado com o responsavel pelo sistema de banco de dados.

 O microsserviço de medicamentos contém nome, id, nivel, empresa e estoque, as funçoes principais são o metodo CRUD, então consulta, registro, atualizaçao e remoçao dos produtos. Esse microsserviço foca mais no funcionario, entao exite mais liberdade para fazer alteraçoes necessarias.

 O sistema funciona pelo docker/kubernetes para manter o servidor de pé, dependendo somente que o servidor esteja ligado e operando.

 Sera usado o ElephantSQL como principal provedor de Base de Dados
 
 Link do video: https://www.youtube.com/watch?v=zamye5PsD04
