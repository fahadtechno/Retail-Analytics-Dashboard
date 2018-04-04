import { Injectable } from '@angular/core';

declare var $;
declare var d3;

@Injectable()
export class BargraphService {

    constructor() { }

    customerDemographics(element, height) {

        // Chart setup

        // Basic setup
        // ------------------------------

        // Define main variables
        var d3Container = d3.select(element),
            margin = { top: 5, right: 20, bottom: 20, left: 60 },
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height: any = height - margin.top - margin.bottom - 5;


        // Format data
        var parseDate = d3.time.format("%Y-%m").parse,
            formatYear = d3.format("02d"),
            formatDate = function (d) { return "Q  " + ((d.getMonth() / 3 | 0) + 1) + formatYear(d.getFullYear() % 100); };

        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2);

        // Vertical
        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0]);

        var y0 = d3.scale.ordinal()
            .rangeRoundBands([height, 0]);

        var y1 = d3.scale.linear();

        // Colors
        var color = d3.scale.category20();



        // Create axes
        // ------------------------------

        // Horizontal
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(formatDate);

        // Vertical
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");



        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append("svg");

        // Add SVG group
        var svg = container
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Construct chart layout
        // ------------------------------

        // Nest
        var nest = d3.nest()
            .key(function (d) { return d.browser; });

        // Stack
        var stack = d3.layout.stack()
            .values(function (d) { return d.values; })
            .x(function (d) { return d.date; })
            .y(function (d) { return d.value; })
            .out(function (d, y0) { d.valueOffset = y0; });




        // Load data
        // ------------------------------

        d3.tsv("assets/demo_data/d3/bars/bars_stacked_multiple.tsv", function (error, data) {

            // Pull out values
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.value = +d.value;
            });

            // Nest values
            var dataByGroup = nest.entries(data);


            // Set input domains
            // ------------------------------

            // Stack
            stack(dataByGroup);

            // Horizontal
            x.domain(dataByGroup[0].values.map(function (d) { return d.date; }));

            // Vertical
            y0.domain(dataByGroup.map(function (d) { return d.key; }));
            y1.domain([0, d3.max(data, function (d) { return d.value; })]).range([y0.rangeBand(), 0]);


            // Add tooltip
            // ------------------------------

            // Create tooltip
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-25, 0])
                .html(function(d) {
                    return  "<p class='text-semibold'>Date " + 'nov 2, 2018' + "</p>"+"<p class='text-semibold'> Time " + '2 PM' + "</p>"+"<p class='text-semibold'> Age " + '25' + "</p>";
                })

            // Initialize tooltip
            svg.call(tip);
            //
            // Append chart elements
            //

            // Add bars
            // ------------------------------

            // Group bars
            var group = svg.selectAll(".d3-bar-group")
                .data(dataByGroup)
                .enter()
                .append("g")
                .attr("class", "d3-bar-group")
                .attr("transform", function (d) { return "translate(0," + y0(d.key) + ")"; });

            // Append text
            group.append("text")
                .attr("class", "d3-group-label")
                .attr("x", -12)
                .attr("y", function (d) { return y1(d.values[0].value / 2); })
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d.key; });


            // Add bars
            group.selectAll(".d3-bar")
                .data(function (d) { return d.values; })
                .enter()
                .append("rect")
                .attr("class", "d3-bar")
                .attr("x", function (d) { return x(d.date); })
                .attr("y", function (d) { return y1(d.value); })
                .attr("width", x.rangeBand())
                .attr("height", function (d) { return y0.rangeBand() - y1(d.value); })

                .on("mouseover", tip.show)
                .on("mouseout",  tip.hide)
                .on("mousemove", function (d) {
                    console.log(d);
                    var xPosition = d3.mouse(this)[0] - 5;
                    var yPosition = d3.mouse(this)[1] - 5;
                })
                .style("fill", function (d) { return color(d.browser); });




            // Append axes
            // ------------------------------

            // Horizontal
            group.filter(function (d, i) { return !i; }).append("g")
                .attr("class", "d3-axis d3-axis-horizontal d3-axis-strong")
                .attr("transform", "translate(0," + (y0.rangeBand() + 1) + ")")
                .call(xAxis);

            // Vertical
            var verticalAxis = svg.append("g")
                .attr("class", "d3-axis d3-axis-vertical d3-axis-strong")
                .call(yAxis);

            // Appent text label
            verticalAxis.append("text")
                .attr('class', 'browser-label')
                .attr("x", -12)
                .attr("y", 12)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("fill", "#999")
                .style("font-size", 12)
                .text("");


            // Setup layout change
            // ------------------------------

            // Add change event
            d3.selectAll(".stacked-multiple").on("change", change);

            // Change value on page load
            var timeout = setTimeout(function () {
                change()
            }, 2000);

            // Change function
            function change() {
                transitionStacked();
            }

            // Transition to multiples
            function transitionMultiples() {
                var t = svg.transition().duration(750),
                    g = t.selectAll(".d3-bar-group").attr("transform", function (d) { return "translate(0," + y0(d.key) + ")"; });
                g.selectAll(".d3-bar").attr("y", function (d) { return y1(d.value); });
                g.select(".d3-group-label").attr("y", function (d) { return y1(d.values[0].value / 2); })
            }

            // Transition to stacked
            function transitionStacked() {
                var t = svg.transition().duration(750),
                    g = t.selectAll(".d3-bar-group").attr("transform", "translate(0," + y0(y0.domain()[0]) + ")");
                g.selectAll(".d3-bar").attr("y", function (d) { return y1(d.value + d.valueOffset) });
                g.select(".d3-group-label").attr("y", function (d) { return y1(d.values[0].value / 2 + d.values[0].valueOffset); })
            }
        });



        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', resize);

        // Call function on sidebar width change
        $('.sidebar-control').on('click', resize);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function resize() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);


            // Axes
            // -------------------------

            // Horizontal range
            x.rangeRoundBands([0, width], .2);

            // Horizontal axis
            svg.selectAll('.d3-axis-horizontal').call(xAxis);

            // Chart elements
            // -------------------------

            // Line path
            svg.selectAll('.d3-bar').attr("x", function (d) { return x(d.date); }).attr("width", x.rangeBand());
        }
    }


    dwellTime(element, height) {

        // Chart setup


        // Basic setup
        // ------------------------------

        // Define main variables
        var d3Container = d3.select(element),
            margin = { top: 5, right: 20, bottom: 20, left: 40 },
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height: any = height - margin.top - margin.bottom - 5;

        // Format data
        var formatPercent = d3.format(".0%");



        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1, 1);

        // Vertical
        var y = d3.scale.linear()
            .range([height, 0]);

        // Colors
        var colors = d3.scale.category20c();



        // Create axes
        // ------------------------------

        // Horizontal
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        // Vertical
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);



        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append("svg");

        // Add SVG group
        var svg = container
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Load data
        // ------------------------------

        d3.tsv("assets/demo_data/d3/bars/bars_basic.tsv", function (error, data) {

            // Pull out values
            data.forEach(function (d) {
                d.frequency = +d.frequency;
            });


            // Set input domains
            // ------------------------------

            // Horizontal
            x.domain(data.map(function (d) { return d.letter; }));

            // Vertical
            y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

// Add tooltip
            // ------------------------------

            // Create tooltip
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-25, 0])
                .html(function(d) {
                    return "<span class='text-semibold'>" + d.frequency*100 + "</span>";                   
                })

                // Initialize tooltip
        svg.call(tip);

                
            //
            // Append chart elements
            //

            // Append axes
            // ------------------------------

            // Horizontal
            svg.append("g")
                .attr("class", "d3-axis d3-axis-horizontal d3-axis-strong")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Vertical
            var verticalAxis = svg.append("g")
                .attr("class", "d3-axis d3-axis-vertical d3-axis-strong")
                .call(yAxis);

            // Add text label
            verticalAxis.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 10)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("fill", "#999")
                .style("font-size", 12)
                .text("Dwell Time");


            // Append bars
            // ------------------------------

            svg.selectAll(".d3-bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "d3-bar")
                .attr("fill", function (d, i) { return colors(i); })
                .attr("x", function (d) { return x(d.letter); })
                .attr("width", x.rangeBand())
                .attr("y", function (d) { return y(d.frequency); })
                .attr("height", function (d) { return height - y(d.frequency); })
                .on("mouseover", tip.show)
                .on("mouseout",  tip.hide)
                .on("mousemove", function (d) {
                    console.log(d);
                    var xPosition = d3.mouse(this)[0] - 5;
                    var yPosition = d3.mouse(this)[1] - 5;
                })

            // Change data sets
            // ------------------------------

            // Attach change event
            d3.select(".toggle-sort").on("change", change);

            // Sort values on page load with delay
            var sortTimeout = setTimeout(function () {
                d3.select(".toggle-sort").property("checked", true).each(change);
                $.uniform.update();
            }, 2000);

            // Sorting function
            function change() {
                clearTimeout(sortTimeout);

                // Copy-on-write since tweens are evaluated after a delay.
                var x0 = x.domain(data.sort(this.checked
                    ? function (a, b) { return b.frequency - a.frequency; }
                    : function (a, b) { return d3.ascending(a.letter, b.letter); })
                    .map(function (d) { return d.letter; }))
                    .copy();

                var transition = svg.transition().duration(750),
                    delay = function (d, i) { return i * 50; };

                transition.selectAll(".d3-bar")
                    .delay(delay)
                    .attr("x", function (d) { return x0(d.letter); });

                transition.select(".d3-axis-horizontal")
                    .call(xAxis)
                    .selectAll("g")
                    .delay(delay);
            }
        });



        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', resize);

        // Call function on sidebar width change
        $('.sidebar-control').on('click', resize);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function resize() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);


            // Axes
            // -------------------------

            // Horizontal range
            x.rangeRoundBands([0, width], .1, 1);

            // Horizontal axis
            svg.selectAll('.d3-axis-horizontal').call(xAxis);


            // Chart elements
            // -------------------------

            // Line path
            svg.selectAll('.d3-bar').attr("width", x.rangeBand()).attr("x", function (d) { return x(d.letter); });
        }
    }

}
