# spa-app-shell

Single Spa RootConfig/container/app-shell

# Create RootConfig

npx create-single-spa --moduleType root-config

# To create single spa application

npx create-single-spa --moduleType app-parcel

# Add shared dependency

"react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
"react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"

# Shareable, customizable webpack config

npm install --save-dev webpack-config-single-spa webpack-merge
