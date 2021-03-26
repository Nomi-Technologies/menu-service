# 1.0.0-staging.1 (2021-03-26)


### Bug Fixes

* change commitlint to conventional ([#89](https://github.com/Nomi-Technologies/menu-service/issues/89)) ([fbcd04d](https://github.com/Nomi-Technologies/menu-service/commit/fbcd04dcb0bd663516d72e6924c41b4e0b4b4873))
* make footer max line rule a warning ([#96](https://github.com/Nomi-Technologies/menu-service/issues/96)) ([99aa27b](https://github.com/Nomi-Technologies/menu-service/commit/99aa27b8f9d1dd0cb823f05d3dd970a6ca9f085c)), closes [#89](https://github.com/Nomi-Technologies/menu-service/issues/89) [#91](https://github.com/Nomi-Technologies/menu-service/issues/91) [#93](https://github.com/Nomi-Technologies/menu-service/issues/93) [#95](https://github.com/Nomi-Technologies/menu-service/issues/95)
* skip husky inline before semantic release ([#94](https://github.com/Nomi-Technologies/menu-service/issues/94)) ([eae6fb2](https://github.com/Nomi-Technologies/menu-service/commit/eae6fb2613184db88bbad6b83690f379bcb7174e)), closes [#89](https://github.com/Nomi-Technologies/menu-service/issues/89) [#91](https://github.com/Nomi-Technologies/menu-service/issues/91) [#93](https://github.com/Nomi-Technologies/menu-service/issues/93)
* skip husky on semantic release ([#92](https://github.com/Nomi-Technologies/menu-service/issues/92)) ([7f6c3d3](https://github.com/Nomi-Technologies/menu-service/commit/7f6c3d3a2ab3963d8361fc221cd1d97a1c13d91c)), closes [#89](https://github.com/Nomi-Technologies/menu-service/issues/89) [#91](https://github.com/Nomi-Technologies/menu-service/issues/91)
* **controller:** remove redundant method ([03e458a](https://github.com/Nomi-Technologies/menu-service/commit/03e458a4609ad8ab33ea10ac727bc8d8c532724e))
* **controller:** remove ref of description in modification ([bd29704](https://github.com/Nomi-Technologies/menu-service/commit/bd29704c53a2f969f2e2810da8b091e55f0aef16))
* **db config:** remove duplicate json entry ([e22b995](https://github.com/Nomi-Technologies/menu-service/commit/e22b9950ee8d75e5c24d18d9c6a60a0aae76057e))
* **db config:** use ssl ([5862e39](https://github.com/Nomi-Technologies/menu-service/commit/5862e3968449485d6f81f2ef65830f0a30514211))
* **index.js:** add limit to bodyparser.urlencoded ([e77dc21](https://github.com/Nomi-Technologies/menu-service/commit/e77dc21ff729af5b74a5860e00e54329382e956e))
* **seeder:** typos and actual seeder reverting ([bacf1fe](https://github.com/Nomi-Technologies/menu-service/commit/bacf1fe426363a4fe2d6b0ee32888785714f8c3f))
* **updateMod:** using addTags to avoid overriding ([2ede37e](https://github.com/Nomi-Technologies/menu-service/commit/2ede37ee1ef332ca0303bdd4a1855c25bdbe465f))


### Features

* add husky and Commitlint ([#81](https://github.com/Nomi-Technologies/menu-service/issues/81)) ([2482bbe](https://github.com/Nomi-Technologies/menu-service/commit/2482bbefb4446b9b5b94d65f6aed194b187e034d))
* **utils:** add Winston logger ([#79](https://github.com/Nomi-Technologies/menu-service/issues/79)) ([6c5caac](https://github.com/Nomi-Technologies/menu-service/commit/6c5caac37743ef1bdb0ebefdd84458f14e50f3ef))
* add controller for getAllMenus ([7f58c16](https://github.com/Nomi-Technologies/menu-service/commit/7f58c16c5dcf561f92590921248360616299538f))
* add logic to get all menus by restaurant id ([950adbc](https://github.com/Nomi-Technologies/menu-service/commit/950adbc07d13778802b25f6b303a62efb0a3993b))
* add menuController route for getAllMenus ([fef7506](https://github.com/Nomi-Technologies/menu-service/commit/fef7506880ece1ca08f93d5ee9f89078279f90b9))
* Diet filtering models, endpoints & some clean-ups ([#74](https://github.com/Nomi-Technologies/menu-service/issues/74)) ([9ab238c](https://github.com/Nomi-Technologies/menu-service/commit/9ab238c33c2113a4f2a58ca2eb3f297df68a1a49))
* PR template ([#73](https://github.com/Nomi-Technologies/menu-service/issues/73)) ([826275e](https://github.com/Nomi-Technologies/menu-service/commit/826275e455b9bb26bfbc99e441d5f746fc9304b8))
* **aws:** add multer and multers3 to upload images to s3, also serialize errors ([9521b3c](https://github.com/Nomi-Technologies/menu-service/commit/9521b3c5a59cfbac73dccc89b7552cdf8b0d0674))
* **getDish:** split Tags into addTags and removeTags ([9df76dc](https://github.com/Nomi-Technologies/menu-service/commit/9df76dc2bd1cf11251ab0a7463001b0085268c62))
* **routes, controller:** added endpoint for fetching all modifications ([997573e](https://github.com/Nomi-Technologies/menu-service/commit/997573e9eb4a0ff0e4ffadd134a998b1309e5161))
* **seed:** added some test cases for adding dish to tray ([eaa89e3](https://github.com/Nomi-Technologies/menu-service/commit/eaa89e38fe88d3066e96537ec33f03516265a11c))
