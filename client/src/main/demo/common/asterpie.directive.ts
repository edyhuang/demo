import 'jquery/jquery';

import {Directive, Input, Injectable, OnChanges, SimpleChange, ElementRef} from '@angular/core';
import 'd3';

@Directive
({
    selector : 'asterpie'
})
@Injectable()
export class Asterpie implements OnChanges
{
    @Input() data : any;
    
    public datacache : any;
    public divs : any;
    public pie : any;
    public arc : any;
    public outlineArc : any;
    public drawn : boolean = false;
        
    constructor(private elementRef : ElementRef){}

    drawAster = () =>
    {
        if (this.drawn) return;
        
        let width = 200,
        height = 200,
        radius = Math.min(width, height) / 2.1,
        innerRadius = 0.3 * radius;

        this.pie = d3.layout.pie()
            .sort(null)
            .value((d) => { return d.width; });

        this.arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius((d) => { 
            return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
        });

        this.outlineArc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(radius);

        let host = d3.select(this.elementRef.nativeElement);
        if (host.select("svg").size()>0)
            host.select("svg").remove();
            
        this.divs = host.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("align", "center");
            
        this.drawn = true;
   }

    render = (data : any) =>
    {
        data.forEach((d) => {
            d.id     =  d.id;
            d.order  = +d.order;
            d.color  =  d.color;
            d.weight = +d.weight;
            d.score  = +d.score;
            d.width  = +d.weight;
            d.label  =  d.label;
        });
        
        let path = this.divs.selectAll(".solidArc")
            .data(this.pie(data))
            .enter().append("path")
            .attr("fill", (d) => { return d.data.color; })
            .attr("class", "solidArc")
            .attr("stroke", "gray")
            .attr("d", this.arc);

        let outerPath = this.divs.selectAll(".outlineArc")
            .data(this.pie(data))
            .enter().append("path")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("class", "outlineArc")
            .attr("d", this.outlineArc);  

        let score = 
            data.reduce((a, b) => {
                return a + (b.score * b.weight); 
                }, 0) / 
                data.reduce((a, b) => { 
                    return a + b.weight; 
            }, 0);

        this.divs.append("svg:text")
            .attr("class", "aster-score")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(Math.round(score));    
    }
    
    ngOnChanges( changes : {[ key : string ] : SimpleChange }) : void
    {
        let data = changes['data'].currentValue.payload;        
        
        this.datacache = data;
        this.drawAster();
        this.render(this.datacache);
    } 
}