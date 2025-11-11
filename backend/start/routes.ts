import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

router.group(() => {
  router.post('registros', [() => import('#controllers/users_controller'), 'store']);
  
  router.post('login', [() => import('#controllers/users_controller'), 'login'])

  router.delete('logout', [() => import('#controllers/users_controller'), 'logout']).use(middleware.auth())
}).prefix('api/v1/usuarios/')

router.group(() => {
  router.post('adicionar', [() => import('#controllers/livros_controller'), 'store'])

  router.put(':id/deletar', [() => import('#controllers/livros_controller'), 'destroy'])

  router.put(':id/editar', [() => import('#controllers/livros_controller'), 'update'])

  router.get('exibirLivros', [() => import('#controllers/livros_controller'), 'index'])

  router.get('ultimoLivro', [() => import('#controllers/livros_controller'), 'showLast'])
}).prefix('api/v1/livros').use(middleware.auth())