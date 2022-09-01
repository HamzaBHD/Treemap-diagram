import './Diagram.css';
import * as d3 from 'd3';
import { useState, useEffect } from 'react';

const Diagram = ({width, height, values}) => {
    useEffect(() => {
        createDiagram();
        createLegend();
    }, [values])
    
    let fader = (color) => d3.interpolateRgb(color, '#fff')(0.2)
    const colors = [
        '#1f77b4',
        '#aec7e8',
        '#ff7f0e',
        '#ffbb78',
        '#2ca02c',
        '#98df8a',
        '#d62728',
        '#ff9896',
        '#9467bd',
        '#c5b0d5',
        '#8c564b',
        '#c49c94',
        '#e377c2',
        '#f7b6d2',
        '#7f7f7f',
        '#c7c7c7',
        '#bcbd22',
        '#dbdb8d',
        '#17becf',
        '#9edae5'
      ].map(fader);
      let canvas = d3.select('#svgContainer')
      
      const createDiagram = () => {                        
        let tooltip = d3.select('#tooltip').style('visibility', 'hidden')
        
        let hierarchy = d3.hierarchy(values, node => node.children)
                          .sum(node => node.value)
                          .sort((node1, node2) => node2.value - node1.value)
                          
                          let createTreeMap = d3.treemap().size([width, height])
                          
                          createTreeMap(hierarchy)
                          
        let gamesTiles = hierarchy.leaves()
        
      
        console.log(gamesTiles)
        
        
        let block = canvas.selectAll('g')
        .data(gamesTiles)
        .enter()
              .append('g')
              .attr('transform', item => 'translate(' + item.x0 + ',' + item.y0 + ')')
              
              block.append('rect')
            .attr('class', 'tile')
            .attr('fill', item => {
                let category = item.data.category
                if(category === 'Wii'){
                    return colors[0]
                } else if (category === 'PS3'){
                    return colors[1]
                } else if(category === 'PS2') {
                    return colors[2]
                } else if(category === '2600') {
                    return colors[3]
                } else if(category === 'NES') {
                    return colors[4]
                } else if(category === 'GB') {
                    return colors[5]
                } else if(category === 'DS') {
                    return colors[6]
                } else if(category === 'X360') {
                    return colors[7]
                } else if(category === 'SNES') {
                    return colors[8]
                } else if(category === 'GBA') {
                    return colors[9]
                } else if(category === 'PS4') {
                    return colors[10]
                } else if(category === '3DS') {
                    return colors[11]
                } else if(category === 'N64') {
                    return colors[12]
                } else if(category === 'PS') {
                    return colors[13]
                } else if(category === 'XB') {
                    return colors[14]
                } else if(category === 'PC') {
                    return colors[15]
                } else if(category === 'PSP') {
                    return colors[16]
                } else if(category === 'XOne') {
                    return colors[17]
                }
            })
            .attr('data-name', item => item.data.name)
            .attr('data-value', item => item.data.value)
            .attr('data-category', item => item.data.category)
            .attr('width', item => item.x1 - item.x0)
            .attr('height', item => item.y1 - item.y0)
            .on('mouseover', (e, item) => {
                tooltip.style('visibility', 'visible')
                .html(`Name: ${item.data.name} <br /> 
                Category: ${item.data.category} <br/> 
                Value: ${item.data.value}`)
                .style('left', (e.pageX + 10) + 'px')
                .style('top', (e.pageY + 10) + 'px')
                .attr('data-value', item.data.value)
            })
            .on('mouseout', () => tooltip.style('visibility', 'hidden'))
            
            block.append('text')
            .selectAll('tspan')
            .data(item => {
                return item.data.name.split(/(?=[A-Z][^A-Z])/g)})
            .enter()
            .append('tspan')
            .attr('x', 4)
            .attr('y', (d, i) => 13 + i * 10)
            .text(item => item)
    }
    
    const createLegend = () => {
        const dataSet = ['Wii', 'DS', 'X360', 'GB', 'PS3', 'NES', 'PS2', '3DS', 'PS4', 'SNES','PS', 'GBA', 'XB', 'N64','PC', '2600' ,'PSP', 'XOne']
        let block = d3.select('#legend')
            .selectAll('g')
            .data(dataSet).enter()
            .append('g')
            
            block.append('rect')
            .attr('class', 'legend-item')
            .attr('width', 50)
            .attr('height', 10)
            .attr('x', (d, i) => i * 56)
            .attr('fill', category => {
                if(category === 'Wii'){
                    return colors[0]
                } else if (category === 'PS3'){
                    return colors[1]
                } else if(category === 'PS2') {
                    return colors[2]
                } else if(category === '2600') {
                    return colors[3]
                } else if(category === 'NES') {
                    return colors[4]
                } else if(category === 'GB') {
                    return colors[5]
                } else if(category === 'DS') {
                    return colors[6]
                } else if(category === 'X360') {
                    return colors[7]
                } else if(category === 'SNES') {
                    return colors[8]
                } else if(category === 'GBA') {
                    return colors[9]
                } else if(category === 'PS4') {
                    return colors[10]
                } else if(category === '3DS') {
                    return colors[11]
                } else if(category === 'N64') {
                    return colors[12]
                } else if(category === 'PS') {
                    return colors[13]
                } else if(category === 'XB') {
                    return colors[14]
                } else if(category === 'PC') {
                    return colors[15]
                } else if(category === 'PSP') {
                    return colors[16]
                } else if(category === 'XOne') {
                    return colors[17]
                }
            })


        block.append('text')
            .text(item => item)
            .attr('fill', 'black')
            .attr('x', (d, i) => i * 56)
            .attr('y', 22)
    }


    return (
        <>
        <div id='tooltip'>
        
        </div>
        <svg id='svgContainer' width={width} height={height}></svg>
        <svg id='legend'></svg>
        </>
    )
};

export default Diagram;
