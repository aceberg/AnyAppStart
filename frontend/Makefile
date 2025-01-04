PKG_NAME=AnyAppStart
USR_NAME=aceberg

build:
	npm run build && \
	rm ../backend/internal/web/public/assets/* && \
	cp -r dist/assets ../backend/internal/web/public
	cp dist/logo.png ../backend/internal/web/public/assets/

replace:
	cd ../backend/internal/web/public/assets/ && \
	cat index-*.js | sed 's/http:\/\/0.0.0.0:8830//' > index.js && \
	cat index-*.css > index.css && \
	rm index-*

all: build replace