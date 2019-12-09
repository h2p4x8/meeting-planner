# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/h2p4x8/meeting-planner.git master:gh-pages

cd -
