import * as  d3 from 'd3';

export class BarGraphImplementationComponent {

    

  public static createVerticleBar({data , index , chartContainer , svg_width , svg_height , color, millionTransformFn , maxValue = false}) {
    let max = 0;
    if(maxValue){
        max = d3.max(data , d=>{
            return +d.value
       })
    }
    // var svg_width = 800;
    // var svg_height = 400;
    const graphHeight = svg_height - 30;
    const graphWidth = svg_width;
    const bar_width = 14;
    const padding = 16;

    const element = chartContainer.toArray()[index].nativeElement;
    const svg = d3.select(element)
        .append('svg')
        .attr('width', svg_width)
        .attr('height', svg_height);

    // scale
    //
    let x_scale = d3.scaleBand()
    .domain(d3.range(data.length))
    // .range([0 , chart_width]) -- >> svg are not good with pixels in fractions
    .rangeRound([0, graphWidth]);

        // .range([0 , svg_width]) -- >> svg are not good with pixels in fractions



    let y_scale = d3.scaleLinear()
        .domain([0, d3.max(data , d=>{
            return +d.value
        })])
        .range([(graphHeight *10)/100, graphHeight]);
    // Bind Data and create bars
    svg.append('g')
      .attr('transform' , 'translate(' +   (svg_width - (x_scale(data.length - 1) + bar_width)) / 2  + ', 0)')


  .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', (d, i) => {
            const x1 = x_scale(i);
            const x2 = x_scale(i) + bar_width;
            const y1 = graphHeight;
            const y2 = graphHeight - y_scale(+d.value);
            const arcRadius = bar_width / 2;
            const arc = 'A' + arcRadius + ' ' + arcRadius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + x2 + ' ' + (y2 + arcRadius);
                    if(+d.value > 0){

                    return 'M' + x1 + ' ' + y1 + 'L' + x1 + ' ' + (y2 + arcRadius) + arc + 'L' + x2 + ' ' + y1 + 'Z';
                    }
                    return null;

                })
        // .attr('ry' , d=> bar_width/2)
        .attr('fill', (d,i)=>{
            if(maxValue){
                if(+d.value == max){
                    return color[0];
                }else{
                    return color[1];
                }
            }else{
                return color[i];
            } 
        });

    svg
    .append('line')
    .attr('x1' , 0)
    .attr('y1' , graphHeight)
    .attr('x2' , svg_width)
    .attr('y2' , graphHeight)
    .attr('stroke-width', 0.5)
    .attr('stroke', '#707070')
    .attr('opacity' , 0.152);

    svg.append('g')
    .attr('transform' , 'translate(' +   (svg_width - (x_scale(data.length - 1) + bar_width)) / 2  + ', 0)')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
        return millionTransformFn(+d.value);
    })
    .attr('font-size', (d,i)=>{
            return 12;
    })
      .attr('fill', '#58585B')
      .attr('font-style' , 'normal')
    .attr('font-weight' , (d,i)=>{
        if(+d.value == max){
            return 'bold';
        }else{
            return 500;
        }
    })
    .attr('x', function(d, i) {
        return x_scale(i) + ((bar_width - this.getBBox().width)/2) ;
    })
    .attr('y', function(d) {
        return graphHeight + padding;
    });
    // .attr("transform", function(d , i) {
    //     const x = x_scale(i) + bar_width ;
    //     const y = graphHeight + padding;
    //     return "translate(" + x +","+ y + ")rotate(-70)"
    //     })
    // .style("text-anchor", "end")

    // svg.append('g').selectAll('text')
    // .data(data)
    // .enter()
    // .append('text')
    // .text(function(d , i) {
    //     return d.text ;
    // })
    // .attr('font-size', 12)
    // .attr('fill', '#58585B')
    // .attr('font-weight' , (d,i)=>{
    //     if(+d.value == max){
    //         return 'bold';
    //     }else{
    //         return 500;
    //     }
    // })
    // .attr('x', function(d, i) {
    //     return (x_scale(i) + (svg_width - (x_scale(data.length - 1) + bar_width)) / 2) + (bar_width - this.getBBox().width)/2 ;
    // })
    // .attr('y', function(d) {
    //     return svg_height -padding;
    // });

  }




  public static createHorizontalBar({data , index , chartContainer , svg_width , svg_height , color, millionTransformFn}) {

    const finalArr = []
    const textPadding = (svg_height * 40)/100;
    const padding = 5;
    const barHeight = (svg_height * 15)/100 ;
    const barWidth  = svg_width - (svg_height * 45)/100;
    const circleRadius = 2;
    const circleMargin = 4;
    const textFontSize = 12;
    // create svg element
    const element = chartContainer.nativeElement;

    const svg = d3.select(element)
    .append( 'svg')
    .attr( 'width' , svg_width)
    .attr( 'height' , svg_height)
    .append('g')
    .attr('transform' , 'translate(' + (svg_width - barWidth) / 2 + ',' + (svg_height - barHeight - textPadding - padding - textFontSize)/2  +')');

         const height_scale = d3.scaleLinear()
        .domain([0, +data[0].value])
        .range([(barHeight *10)/100, barHeight]);

        const width_scale = d3.scaleLinear()
        .domain([0, +data[0].value])
        .range([(barWidth *3)/100, barWidth]);

    if(+data[0].value != 0){
    let rectArr = [];
    svg.append('g').selectAll('rect')
    .data( data)
    .enter()
    .append('rect')
    .attr('width' ,  d => {
       const calc = Math.ceil(width_scale(+d.value));
       return calc;
    })
    .attr('height' , (d, i) =>{
        const maxHeight =  Math.ceil(height_scale(+data[0].value));

        // return ;
        // // if(rectMap[calc]){
        // //     counter++;
        // //     rectMap[calc] = calc - counter * 6;
        // //     rectArr.push(calc - counter * 6);
        // //     return rectMap[calc];
        // // }

        // rectMap[calc] = calc;
        rectArr.push(maxHeight - (i * (maxHeight / data.length)));
        return maxHeight - (i * (maxHeight / data.length));
     })
    .attr('rx' , (d,i) =>  rectArr[i] / 2)
    .attr('transform', (d, i) => {
      if (i > 0 ) {
        return  i > 0 ? 'translate(0,' + (barHeight - rectArr[i]) / 2 + ')' : null;
      }

    })
    .attr('fill', (d , i) => color[i]);

    svg.selectAll('circle')
    .data(data)
    .enter()
    .append('g')
    .append('circle')
    .attr('cx' , (d, i) => {
        if(width_scale(+d.value) > circleRadius*2){
            return width_scale(+d.value) - circleRadius*2;
        }
        return width_scale(+d.value);
    })
    .attr('cy' , d => barHeight / 2)
    .attr('r', d=>{
            if(Math.ceil(height_scale(+d.value))/2 > 2){
                return circleRadius;
            }else{
                return Math.ceil(height_scale(+d.value))/2;
            }

    })
    .attr('stroke' , '#707070')
    .attr('stroke-width' ,  d=>{
            if(Math.ceil(height_scale(+d.value))/2 > 2){
                return circleRadius/4;
            }else{
                return (Math.ceil(height_scale(+d.value))/2)/4;
            }
    })
    .attr('fill' , '#ffff');

    svg.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', (d, i) => {
        // starting point x1 y1
        let x1 = width_scale(+d.value);
        if(width_scale(+d.value) > circleRadius*2){
            x1 =  width_scale(+d.value) - circleRadius*2;
        }

            const y1= barHeight / 2 + circleRadius;
       //Line to x2 y2
      // const  x2 = width_scale(+d.value) - circleRadius*2;
        let y2 = svg_height - textPadding - padding - textFontSize
                if(i==data.length - 1){
                    y2=  barHeight + padding;
                }else if( i == 1){
                    y2 =  barHeight + (padding*2);
                }

        if(i == 1){

             const x4 = barWidth/2;
             const y4 = svg_height - textPadding - padding - textFontSize;
             return "M" + x1 + " " + y1 + "L" + x1 + " " + y2 + "L" + x4 + " " + y2 + "L" + x4 + " " + y4 ;
        }
        if(i==data.length - 1){
            const x4=  0 + (circleRadius * 1.5);
            const y4 = svg_height - textPadding - padding - textFontSize;
            return "M" + x1 + " " + y1 + "L" + x1 + " " + y2 + "L" + x4 + " " + y2 + "L" + x4 + " " + y4 ;
        }
        return "M" + x1 + " " + y1 + "L" + x1 + " " + y2;

    })
    .attr('stroke-width', 0.8)
    .attr('stroke', '#58585b')
    .attr('fill', 'none');
}
    svg.append('g').selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(function(d) {
          return millionTransformFn(+d.value);
      })
      .attr('font-weight' , 700)
      .attr('x', function(d, i) {
         // return width_scale(+d.value) - (this.getBBox().width/2) ;
         if(i==data.length - 1){
             //console.log(-((svg_width - barWidth) / 2));
             //console.log(-(this.getBBox().width/2));
            return -((svg_width - barWidth) / 2) > -(this.getBBox().width/2) ? -((svg_width - barWidth) / 2) : -(this.getBBox().width/2);
        }else if(i == 1){
            return barWidth/2 - (this.getBBox().width/2);
        }else{
            if(+d.value == 0){
                return svg_width -  this.getBBox().width -20 ;
            }
            return width_scale(+d.value) - (this.getBBox().width/2) ;
        }
      })
      .attr('y', function(d) {
          return svg_height -  textPadding-padding;
      })
      .attr('font-size', textFontSize)
      .attr('fill', '#58585B')
      .attr('font-weight' , 'bold')
      .attr('font-style' , 'normal');
      // .attr('text-anchor', 'middle');



     const text =  svg.append('g').selectAll('text')
     .data(data)
     .enter()
     .append('text')


      text.selectAll("tspan")
      .data((d,i) => {
        let arr = [];
        const first = d.text.substring(0, d.text.indexOf(' '));
        first != ''? arr.push({text : first , idx : i}) : '';
        const last = d.text.substring(d.text.indexOf(' ') + 1);
        arr.push({text : last , idx : i });
        return arr;

      })
      .enter()
      .append("tspan")
      .text(d => d.text)
      .attr('font-size', textFontSize)
     .attr('fill', '#58585B')
     .attr('font-weight' , 500)
      .attr('x', function(d , i) {
        if(d.idx==data.length - 1){
            return -((svg_width - barWidth) / 2) > -(this.getBBox().width/2) ? -((svg_width - barWidth) / 2) : -(this.getBBox().width/2);
        }else if(d.idx == 1){
            return barWidth/2 - (this.getBBox().width/2);
        }else{
            return barWidth -  (this.getBBox().width/2) ;
        }

        })
        .attr('y', function(d , i) {
            let padding = 0;
            if(i == 0){
                padding = 2;
            }
            return svg_height - textPadding + textFontSize + (textFontSize * i  ) - padding;
        });






   }

    // This graph represents each individual bar having a peak and actual value (designed for consumption in recommendation pop-up)
    public static createIndividualBarGraph({ data, index, chartContainer, svg_width, svg_height, color }) {
        const otherTextSpace = (svg_height * 10) / 100;
        const textSpace = (svg_height * 20) / 100;
        const padding = (svg_height * 40) / 100;
        const element = chartContainer.nativeElement;
        const totalGraphs = data.length;

        const widthPerPair = (svg_width - padding) / totalGraphs;
        const moveG = padding + widthPerPair / 2;
        // var layerColors = d3.interpolateSpectral;
        const y_scale = d3.scaleLinear()
            .domain([0, 100])
            .range([svg_height - padding, 0]);

        const y_axis = d3.axisLeft(y_scale)
            .ticks(5)
            .tickSize(-svg_width)
            .tickFormat(d => d + '%');

        // svg
        const svg = d3.select(element)
            .append('svg')
            .attr('width', svg_width)
            .attr('height', svg_height);

        // y-axis
        svg.append('g')
            .attr('transform', 'translate(' + padding + ' ,' + (padding / 2) + ')')
            .attr('class', 'grid')
            .call(y_axis)
            .select('.domain').remove();



        // y -axis text
        svg.append('text')
            .text('Consumption')
            .attr('font-size', 10)
            .attr('transform', 'rotate(-90)')
            .attr('y', (padding * 20 / 100))
            .attr('x', 1 - svg_height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle');


        // text
        svg.append('text')

            .text(data[0].data.used[0].text)
            .attr('font-size', 10)
            .attr('fill', '#43425D')
            .attr('x', function(d, i) {
                return padding - this.getBBox().width;

            })
            .attr('y', function(d) {
                return svg_height - textSpace + this.getBBox().height * 2;
            });

        // text
        svg.append('text')
            .text(data[0].data.total[0].text)
            .attr('font-size', 10)
            .attr('fill', '#43425D')
            .attr('x', function(d, i) {
                return padding - this.getBBox().width;

            })
            .attr('y', function(d) {
                return svg_height - textSpace + this.getBBox().height * 4;
            });


        // Bind Data and create bars
        const grp = svg.append('g')
            .attr('transform', 'translate(0,' + padding / 2 + ')');
        data.forEach((item, index) => {


            const x_scale = d3.scaleBand()
                .domain(d3.range(1))
                // .range([0 , svg_width]) -- >> svg are not good with pixels in fractions
                .rangeRound([0, widthPerPair / 2]);

            grp.append('g')
                .attr('transform', 'translate(' + (moveG + (widthPerPair * index)) + ', 0)')
                .selectAll('rect')
                .data(item.data.used)
                .enter()
                .append('rect')
                .attr('x', function(d, i) {
                    return x_scale(i);
                })
                .attr('y', function(d) {
                    return 0;
                })
                .attr('width', x_scale.bandwidth() - 5)
                .attr('height', function(d) {
                    return svg_height - padding; // svg_height  + y_scale(d) + textSpace;
                })
                .attr('ry', ((x_scale.bandwidth() - 5) / 2))
                .attr('fill', '#E4E9F0');



            const y_scale_idv = d3.scaleLinear()
                .domain([0, item.data.total[0].data])
                .range([svg_height - padding, 0]);


            grp.append('g')
                .attr('transform', 'translate(' + (moveG + (widthPerPair * index)) + ', 0)')
                .selectAll('rect')
                .data(item.data.used)
                .enter()
                .append('rect')
                .attr('x', function(d, i) {
                    return x_scale(i);
                })
                .attr('y', function(d) {
                    return y_scale_idv(d.data);
                })
                .attr('width', x_scale.bandwidth() - 5)
                .attr('height', function(d) {
                    return svg_height - y_scale_idv(d.data) - padding; // svg_height  + y_scale(d) + textSpace;
                })
                .attr('ry', ((x_scale.bandwidth() - 5) / 2))
                .attr('fill', function(d) {
                    return item.color;
                });

            // text
            svg.append('text')
                .text(item.data.used[0].data// function (d) {
                    // const txt = item.replace(/([A-Z])/g, ' $1');
                    // console.log(txt);
                    // return txt.charAt(0).toUpperCase() + txt.slice(1);
                    // return d.id;
                )
                .attr('font-size', 10)
                .attr('fill', '#43425D')
                .attr('x', function(d, i) {
                    return moveG + (widthPerPair * index) + ((x_scale.bandwidth() - 5 - this.getBBox().width) / 2);

                })
                .attr('y', function(d) {
                    return svg_height - textSpace + this.getBBox().height * 2;
                });


            // text
            svg.append('text')
                .text(item.data.total[0].data// function (d) {
                    // const txt = item.replace(/([A-Z])/g, ' $1');
                    // console.log(txt);
                    // return txt.charAt(0).toUpperCase() + txt.slice(1);
                    // return d.id;
                )
                .attr('font-size', 10)
                .attr('fill', '#43425D')
                .attr('x', function(d, i) {
                    return moveG + (widthPerPair * index) + ((x_scale.bandwidth() - 5 - this.getBBox().width) / 2);

                })
                .attr('y', function(d) {
                    return svg_height - textSpace + this.getBBox().height * 4;
                });
        });
    }


    //   This graph represents single or multiple pair of graphs with extra axisLabel as optional value
    public static createBarGraph({ data, index, chartContainer, svg_width, svg_height, color, axisLabel = false, millionTransformFn }) {

        const margin = { top: 10, right: 10, bottom: 20 , left: 60 , label : 20 , padding : 15};

        if (axisLabel) {
            margin.bottom = 40;
            margin.left = 70;
        }

        let keys = 0;
        data.forEach(ele => {
            if (ele.data.length > keys) {
                keys = ele.data.length;
            }
        });
        const element = chartContainer.nativeElement;
        const x0 = d3.scaleBand()
            .domain(data.map(d => d.id))
            .rangeRound([margin.left + margin.padding, svg_width - margin.right - margin.padding])
            .paddingInner(0.7);

        const x1 = d3.scaleBand()
            .domain(Array.from(Array(keys).keys()))
            .rangeRound([0, x0.bandwidth()])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => {
                return d3.max(d.data, d1 => {
                    return Math.ceil(+d1.data);
                });
            })])
            .range([svg_height - margin.bottom, margin.top]);

        var yAxis = g => g
            .attr('transform', `translate(${margin.left},0)`)
            .call( d3.axisLeft(y).ticks(7).tickSize(-svg_width).tickFormat(d => millionTransformFn(+d)))
            .call(g => g.select('.domain').remove());

        // svg
        const svg = d3.select(element)
            .append('svg')
            .attr('width', svg_width)
            .attr('height', svg_height);

        svg.append('g')
            .call(yAxis);

         // axis Label
        if (axisLabel) {

            svg.append('text')
            .text(data[0].data[0].labels.id)
            .attr('font-size', 10)
            .attr('fill', '#43425D')
            .attr('transform', `translate(10,${svg_height - margin.bottom + margin.padding })`);


            var xLabelAxis = g => g
            .attr('transform', `translate(0,${svg_height - margin.bottom})`)
            .call(d3.axisBottom(x0).tickSizeOuter(0).tickFormat(function(d , i) {
                //console.log(+data[i].data[0].labels.data);
                return +data[i].data[0].labels.data;
            }))
            .call(g => g.select('.domain').remove());


            svg.append('g')
            .call(xLabelAxis);



            var xAxis = g => g
            .attr('transform', `translate(0,${svg_height - margin.label})`)
            .call(d3.axisBottom(x0).tickSizeOuter(0))
            .call(g => g.select('.domain').remove())
            .attr('class', 'axis-label');

            svg.append('g')
            .call(xAxis);

        } else {

            var xAxis = g => g
            .attr('transform', `translate(0,${svg_height - margin.bottom})`)
            .call(d3.axisBottom(x0).tickSizeOuter(0))
            .call(g => g.select('.domain').remove());

            svg.append('g')
            .call(xAxis);
        }
        const tooltip = d3.select('app-sg-shell').select('.content').select('.container-fluid').select('.toolTip');

        svg.append('g').selectAll('g')
            .data(data)
            .join('g')
            .attr('transform', d => `translate(${x0(d['id'])},0)`)
            .selectAll('rect')
            .append('rect')
            .data(d => d.data)
            .join('rect')
            .attr('x', (d, i) => x1(i))
            .attr('y', d => y(d.data))
            .attr('width', x1.bandwidth())
            .attr('height', d => y(0) - y(d.data))
            // .attr('ry', (x1.bandwidth() / 2))
            .attr('fill', (d, i) => color[d.id] ? color[d.id] : color[i])
            .on('mousemove', function(d) {
                tooltip
                  .style('left', d3.event.pageX + 'px')
                  .style('top', d3.event.pageY - 70 + 'px')
                  .style('display', 'inline-block')
                  .html((d.id) + '<br>' + (millionTransformFn(+d.data)));
            })
                .on('mouseout', function(d) { tooltip.style('display', 'none'); });

    }

    //   This bar graph is to create the graph horizontally
    public static createHorBarGraph({ data, index, chartContainer, svg_width, svg_height, color , millionTransformFn }) {

        var padding = 100;
        const heightPadding = 20;
        const element = chartContainer.nativeElement;
        var x_scale = d3.scaleLinear()
            .domain([0, d3.max(data, d => {
                return d3.max(d.data, d1 => {
                    return +d1.data;
                });
            })])
            // .range([0 , svg_width]) -- >> svg are not good with pixels in fractions
            .range([padding, svg_width - heightPadding]);

        const y_scale = d3.scaleBand()
            .domain(d3.range(data.length))
            .rangeRound([0, svg_height - heightPadding])
            .padding(0.7);

        // x-axis
        var x_axis = d3.axisBottom(x_scale)
            .ticks(5)
            .tickSize(0)
            .tickFormat(d => millionTransformFn(+d));

        var y_axis = d3.axisLeft(y_scale)

            .tickSize(0)
            .tickFormat((d, i) => data[i].id);

        const svg = d3.select(element)
            .append('svg')
            .attr('width', svg_width)
            .attr('height', svg_height);

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + (svg_height - heightPadding) + ')')
            .call(x_axis)
            .select('.domain').remove();

        // y-axis
        svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'translate(' + (padding - 10) + ')')
            .call(y_axis)
            .select('.domain').remove();

        var tooltip = d3.select('app-sg-shell').select('.content').select('.container-fluid').select('.toolTip');

        svg
            .append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function(d, i) {
                return padding;
            })
            .attr('y', function(d, i) {
                return y_scale(i);
            })
            .attr('width', (d) => svg_width - heightPadding - padding)
            .attr('height', function(d) {
                return y_scale.bandwidth(); // svg_height  + y_scale(d) + textSpace;
            })
            // .attr('rx', d => (y_scale.bandwidth()) / 2)
            .attr('fill', '#EDF1F7');


        svg
            .append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function(d, i) {
                return padding;
            })
            .attr('y', function(d, i) {
                return y_scale(i);
            })
            .attr('width', (d, i) => {
                return x_scale(+d.data[0].data) - padding;
            })
            .attr('height', function(d) {
                return y_scale.bandwidth(); // svg_height  + y_scale(d) + textSpace;
            })
            // .attr('rx', d => (y_scale.bandwidth()) / 2)
            .attr('fill', (d, i) => {
                if (d.id.toLowerCase() == 'booked') {
                    return color[1];
                }
                return color[0];
            })
            .on('mousemove', function(d) {
                tooltip
                  .style('left', d3.event.pageX + 'px')
                  .style('top', d3.event.pageY - 70 + 'px')
                  .style('display', 'inline-block')
                  .html((d.id) + '<br>' + (millionTransformFn(+d.data[0].data)));
            })
                .on('mouseout', function(d) { tooltip.style('display', 'none'); });

    }


    // This graph is used to create horizontal overlapping graphs.
    public static createOverlapHorBarGraph({ data, index, chartContainer, svg_width, svg_height, color, millionTransformFn }) {

        var padding = 100;
        const heightPadding = 20;
        const element = chartContainer.nativeElement;
        var x_scale = d3.scaleLinear()
            .domain([0, d3.max(data, d => {
                return d3.max(d.data, d1 => {
                    return +d1.data;
                });
            })])
            // .range([0 , svg_width]) -- >> svg are not good with pixels in fractions
            .range([padding, svg_width - heightPadding]);

        const y_scale = d3.scaleBand()
            .domain(d3.range(data.length))
            .rangeRound([0, svg_height - heightPadding])
            .padding(0.7);

        // x-axis
        var x_axis = d3.axisBottom(x_scale)
            .ticks(5)
            .tickSize(0)
            .tickFormat(d => millionTransformFn(+d));
        // .ticks(4)
        // .tickValues([0 , 150 , 250 , 600 , 700])
        var y_axis = d3.axisLeft(y_scale)

            .tickSize(0)
            .tickFormat((d, i) => {
                return data[i].id;
            });
        // or -->> .scale( x_scale )
        const svg = d3.select(element)
            .append('svg')
            .attr('width', svg_width)
            .attr('height', svg_height);

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + (svg_height - heightPadding) + ')')
            .call(x_axis)
            .select('.domain').remove();

        // y-axis
        svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'translate(' + (padding - 10) + ')')
            .call(y_axis)
            .select('.domain').remove();

        var tooltip = d3.select('app-sg-shell').select('.content').select('.container-fluid').select('.toolTip');

        // Bind Data and create bars

        svg
            .append('g')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function(d, i) {
                return padding;
            })
            .attr('y', function(d, i) {
                return y_scale(i);
            })
            .attr('width', (d) => svg_width - padding - heightPadding)
            .attr('height', function(d) {
                return y_scale.bandwidth(); // svg_height  + y_scale(d) + textSpace;
            })
            // .attr('rx', d => (y_scale.bandwidth()) / 2)
            .attr('fill', '#E4E9F0');



        data.forEach((item, index) => {
            const rectMap = {};
            let counter = 0;
            const rect = svg
                .append('g')
                .selectAll('rect')
                .data(item.data.sort((a, b) => {
                    return +b.data - (+a.data);
                }))
                .enter()
                .append('rect')
                .attr('x', function(d, i) {
                    return padding;
                })
                .attr('y', function(d, i) {
                    return y_scale(index);
                })
                .attr('width', (d) => {
                    // below calculation is to set a difference in the width when value is equal
                    const calc = Math.ceil(x_scale(d.data) - padding);

                    if (rectMap[calc]) {
                        counter++;
                        return calc - counter * 2;
                    }
                    rectMap[calc] = true;
                    return calc;

                })
                .attr('height', function(d) {
                    return y_scale.bandwidth(); // svg_height  + y_scale(d) + textSpace;
                })
                // .attr('rx', d => (y_scale.bandwidth()) / 2)
                .attr('fill', (d, i) => d.id ? color[d.id] : color[i])
                .on('mousemove', function(d) {
                    tooltip
                      .style('left', d3.event.pageX + 'px')
                      .style('top', d3.event.pageY - 70 + 'px')
                      .style('display', 'inline-block')
                      .html((d.id) + '<br>' + (millionTransformFn(+d.data)));
                })
                    .on('mouseout', function(d) { tooltip.style('display', 'none'); });
        });


    }

    //   This graph represents single or multiple pair of graphs with extra axisLabel as optional value
    public static createStackedBarGraph({ data, index, chartContainer, svg_width, svg_height, color,
        axisLabel = false, millionTransformFn }) {
       let  margin = {top: 10, right: 10, bottom: 20, left: 60};
       var tooltip = d3.select('app-sg-shell').select('.content').select('.container-fluid').select('.toolTip');
       color = ["#79BADF",  "#30749E"  , '#374B6D', "#81D4E6" , "#CFD4D9" , "#EEC27B" , "#ABDB8E" , "#F8E788" , "#D8DBDF" , "#92E9BE"];

       d3.map(data , d => {
           d.total = d3.sum(d.data , d1 => +d1.data);
       });
    //    data.sort((a, b) => b.total - a.total)
    //    const maxValue = data[0].total;
       const keys = {};
       let count = 0;
       d3.map(data , d => {
        d3.map(d.data , (d1, i) => {
            if (!keys[d1.id]) {
                keys[d1.id] = color[count];
                count++;
            }
        });
    });
    // console.log(data);
    // console.log(keys);
    // var parse = d3.time.format('%Y').parse;
  // Transpose the data into layers
       const stack = d3.stack()
        .keys(Object.keys(keys));

       const series = data.map(d => {
            const obj = {};
            obj['name'] = d.id;
            d.data.forEach(ele => {
                obj[ele.id] = +ele.data;
            });
            return obj;
        });
       var stack_data = stack(series);

       //console.log(stack_data);

       const x = d3.scaleBand()
    .domain(series.map(d1 => d1.name))
    .range([margin.left, svg_width - margin.right])
    .padding(0.7);

       const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .rangeRound([svg_height - margin.bottom, margin.top]);

       const xAxis = g => g
    .attr('transform', `translate(0,${svg_height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll('.domain').remove());

       const yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call( d3.axisLeft(y).ticks(6).tickSize(-svg_width).tickFormat(d => millionTransformFn(+d)))
    .call(g => g.select('.domain').remove());

       
       const element = chartContainer.nativeElement;
       const svg = d3.select(element)
            .append('svg')
            .attr('width', svg_width)
            .attr('height', svg_height);

       svg.append('g')
            .call(xAxis);
       svg.append('g')
            .call(yAxis);

       svg.append('g')
    .selectAll('g')
    .data(stack_data)
    .enter()
    .append('g')
    .style('fill', (d, i) => color[i])
    .selectAll('rect')
    .data(d => {
            d.forEach(ele => {
               ele[2] =  d.key
            });
           return d;
    })
    .join('rect')
    .attr('x', (d, i) => {
        return x(d.data.name);
    })
    .attr('y', d => y(d[1]))
    .attr('height', d => y(d[0]) - y(d[1]))
    .attr('width', x.bandwidth())
    .attr('ry' , 2)
    .on('mousemove', function(d) {
        tooltip
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html((d[2]) + '<br>' +  (millionTransformFn(d[1] - d[0])));
    })
        .on('mouseout', function(d) { tooltip.style('display', 'none'); });
       return keys;
    }
}
