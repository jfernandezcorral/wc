# Uso del componente

El componente se puede consumir con webpack y __ES6__ como módulo __'commonjs'__ o como dependencia __ES5__ cargado en un elemento `<script/>` clásico de la página html.
__wcPredictivo__ declara una sola dependencia que deberá ser satisfecha en cada uno
de los casos.

`
"dependencies": {
    "swl": "git+https://aqdes-stash.cm.es/stash/scm/aicli/swl.git"
  }
`

## Consumir como módulo ES6
Debemos declarar la dependencia en nuestro proyecto

`
"dependencies": {...,
    "wcPredictivo": "git+https://aqdes-stash.cm.es/stash/scm/neowc/ui-predictivo-wc.git", ...
}
`

y hacer un `import 'wcPredictivo'`, la importación de SWL debe ser automática.

Después basta con usar el (nuevo) tag ``<bk-busc-emp></bk-busc-emp>`` y aplicar el API que expone, descrita en el punto __introducción__

## Consumir con ES5 como ``<sript/>`` clásico

Tendremos que descargar como elemento bower:
`https://aqdes-stash.cm.es/stash/scm/neowc/ui-predictivo-wc.git`

Cargar el elemento `<script/>` correspondiente en nuestro htm y tener en cuenta que se depende del global SWL, debe cargarse __previo__ al `<script/>` del componente el del elemento bower que corresponde a SWL:
`https://aqdes-stash.cm.es/stash/scm/aicli/swl.git`

Después basta con usar el (nuevo) tag `<bk-busc-emp></bk-busc-emp>` y aplicar el API que expone, descrita en el punto __introducción__
