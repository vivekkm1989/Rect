(function()  {
    let d3Script = document.createElement('script');
	 let d3Script1 = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v5.min.js';
	 d3Script1.src ='https://requirejs.org/docs/release/2.3.5/minified/require.js';
    d3Script.async = false;
	 d3Script1.async = false;
    document.head.appendChild(d3Script);
	document.head.appendChild(d3Script1);

    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
      <style>
      
      </style>
    `;

    d3Script.onload = () => 

    customElements.define('com-infy-wm-sol', class WM extends HTMLElement {


        disconnectedCallback () {
            // your cleanup code goes here
            try{
                document.head.removeChild(d3Script);
		    document.head.removeChild(d3Script1);
            }
            catch{}
            }
    
        constructor() {
            super();
            //Constants
            if (!window._d3){
                window._d3 = d3;
            }
            
            this._shadowRoot = this.attachShadow({mode: 'open'});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.style.height = "100%";  //Beta Workaround
            this._svgContainer;    
     
            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
            
            this.redraw();
        };

        //Getters and Setters
      /*   get angleMax() {
            return this._endAngleDeg;
        }
        set angleMax(value) {
            //Empty the shadow dom
            if (this._svgContainer){
                this._svgContainer._groups[0][0].innerHTML = "";
            }

            this._endAngleDeg = value;
            this.redraw();
        }; */

        redraw() {
            if (!this._svgContainer){
                this._svgContainer = window._d3.select(this._shadowRoot)
                .append("svg:svg")
                .attr("id", "Worldmap")
                .attr("width", this._widgetWidth)
                .attr("height", this._widgetWidth);
            }

            var vis=this._svgContainer;
           // var eSvg = require.toUrl('https://vivekkm1989.github.io/Rect/image.svg');
            d3.xml("https://vivekkm1989.github.io/Rect/image.svg", function(error, documentFragment) {
                if (error) {
                    console.log(error);
                    return;
                }
    
                var svgNode = documentFragment
                    .getElementsByTagName("svg")[0];
                //use plain Javascript to extract the node
    
                vis.node().appendChild(svgNode);
                var innerSVG = vis.select("svg");
                //	var innerSVG = vis.html(documentFragment);
                innerSVG.selectAll("polygon").style("fill", "white");
                d3.selectAll("polygon").each(function(d, i) {
                    arrsvgelement.push(d3.select(this).attr("id").replace("_", " "));
                });
            });


       
	
        };


        //Helper function	
   
    
    
    });
        
})();