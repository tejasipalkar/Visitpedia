function word(label, SelectedColor, visitCounts){

console.log(visitCounts);
var width = 700,
    height = 700;

var randomX = d3.randomUniform(width, 10),
    randomY = d3.randomUniform(height, 10),
    vertices = d3.range(100).map(function() { return [randomX(), randomY()]; });

var randomX2 = d3.randomUniform(width/1.9, 80),
    randomY2 = d3.randomUniform(height/1.9, 80),
    vertices2 = d3.range(100).map(function() { return [(randomX2()), (randomY2())]; });

var vertices3 = d3.range(100).map(function() { return [(randomX2() + 300), randomY2()]; });

var vertices4 = d3.range(100).map(function() { return [(randomX2() + (randomX2() + 300)) / 2, (randomY2() + 300)]; });

var x = 0,
    y = 0,
    x1 = 0,
    y1 = 0;
    x2 = 0;
    y2 = 0;
    x3 = 0;
    y3 = 0;

console.log(SelectedColor);
$('#area1').empty();
var svg = d3.select("#area1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "viz3svg");

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var hull = svg.append("path")
    .attr("class", "hull");

var hull2 = svg.append("path");

hull2.style("fill", SelectedColor)
    .style("fill-opacity",1);

var hull3 = svg.append("path");

hull3.style("fill", SelectedColor)
    .style("fill-opacity",0.5);

var hull4 = svg.append("path");

hull4.style("fill", SelectedColor)
    .style("fill-opacity",0.25);

vertices.forEach(function(d){
    if(x<d[0]){
        x = d[0];
    }
    if(y<d[1]){
        y = d[1];
    }
})

vertices2.forEach(function(d){
    if(x1<d[0]){
        x1 = d[0];
    }
    if(y1<d[1]){
        y1 = d[1];
    }
})

vertices3.forEach(function(d){
    if(x2<d[0]){
        x2 = d[0];
    }
    if(y2<d[1]){
        y2 = d[1];
    }
})

vertices4.forEach(function(d){
    if(x3<d[0]){
        x3 = d[0];
    }
    if(y3<d[1]){
        y3 = d[1];
    }
})

function wordCloud(svg1,x,y,cloudwidth,cloudheight) {

    var fill = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = svg1.append("g")
    .attr("transform", "translate(" + x + "," + y + ")");

    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        var enter = cloud.enter()
            .append("text")
            .style("font-family", "monospace")
            .style("fill", "rgb(0,0,0)")
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        cloud
            .merge(enter)
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        cloud.exit()
            .merge(enter)
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }

    return {
        update: function(words) {
            d3.layout.cloud().size([cloudwidth, cloudheight])
                .words(words)
                .padding(4)
                .rotate(function(d) {return 0;})
                .font("monospace")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

var word = label;
var flag = 0;
var list_values = [];
var words = "";
d3.csv("data/final_clustered_data.csv", function(error, data){
            if (error) throw error;
            data.forEach(function(f){

                if(f.Key == word){
                    flag = 1;
                    words += f.Values;
                }
                else{
                    list_values.push(f.Values);

                }
            });
            if(flag == 0){
                list_values.forEach(function(d){
                    if(d.indexOf(word) >= 0){
                        d = d.slice(1,d.length - 1);
                        words += d;

                    }

                });
            }

            function getWords(words) {
                return words
                    .map(function(d) {
                        return {text: d, size: 12};
                    })
            }

            function splitvals(arr, n) {
                var rest = arr.length % n, // how much to divide
                restUsed = rest, // to keep track of the division over the elements
                partLength = Math.floor(arr.length / n),
                result = [];

                for(var i = 0; i < arr.length; i += partLength) {
                    var end = partLength + i,
                    add = false;

                    if(rest !== 0 && restUsed) { // should add one element for the division
                        end++;
                        restUsed--; // we've used one division element now
                        add = true;
                    }

                    result.push(arr.slice(i, end)); // part of the array

                    if(add) {
                        i++; // also increment i in the case we added an extra element for division
                    }
                }

            return result;
            }
            console.log(words);
            var values = words.split(',');
            console.log(values);
            if (values.length > 6){
                var newvals = splitvals(values,3);
                hull.datum(d3.polygonHull(vertices)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
                hull2.datum(d3.polygonHull(vertices2)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
                hull3.datum(d3.polygonHull(vertices3)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
                hull4.datum(d3.polygonHull(vertices4)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
                var myWordCloud = wordCloud(svg,x1/1.7,y1/1.7,270,270);
                myWordCloud.update(getWords(newvals[0]));
                console.log(newvals[0]);
                console.log(newvals[1]);
                console.log(newvals[2]);

                myWordCloud = wordCloud(svg,x2/1.3,y2/1.7,270,270);
                myWordCloud.update(getWords(newvals[1]));

                myWordCloud = wordCloud(svg,x3/1.4,y3/1.3,270,270);
                myWordCloud.update(getWords(newvals[2]));
            }
            else if(values.length == 1){
                values = [label];
                randomX = d3.randomUniform(width/1.2, 60),
                randomY = d3.randomUniform(height/1.2, 60),
                vertices = d3.range(100).map(function() { return [randomX(), randomY()]; });

                hull.datum(d3.polygonHull(vertices)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
                var myWordCloud = wordCloud(svg,x/2,y/2,width/1.4,height/1.4);
                myWordCloud.update(getWords(values));
            }
            else{
                    randomX = d3.randomUniform(width/1.2, 60),
                    randomY = d3.randomUniform(height/1.2, 60),
                    vertices = d3.range(100).map(function() { return [randomX(), randomY()]; });

                hull.datum(d3.polygonHull(vertices)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
                var myWordCloud = wordCloud(svg,x/2,y/2,width/1.4,height/1.4);
                myWordCloud.update(getWords(values));
            }

  });
}
