function word(Selected){
function wordCloud(selector) {

    var fill = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select(selector).append("svg")
        .attr("width", 700)
        .attr("height", 700)
        .append("g")
        .attr("transform", "translate(350,350)");

    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        var enter = cloud.enter()
            .append("text")
            .style("font-family", "monospace")
            .style("fill", function(d, i) { return fill(i); })
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
            d3.layout.cloud().size([700, 700])
                .words(words)
                .padding(5)
                .rotate(function(d) {return 0;})
                .font("monospace")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

var word = Selected;
console.log(word);
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

            function getWords() {
                return words
                    .split(',')
                    .map(function(d) {
                        return {text: d, size: 10 + Math.random() * 60};
                    })
            }

            var myWordCloud = wordCloud('#area1');
            myWordCloud.update(getWords());

  });
}
