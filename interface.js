var test_puzzle = [
	[11, 10, 9, 8, 12, 7, 4, 4, 13],
	[7, 14, 8, 6, 9, 18, 17, 11, 9, 13, 11],
	[16, 5, 5, 5, 7, 9, null, 14, 10, 8, 6, 7, 8],
	[10, 11, 12, 5, 11, null, null, null, null, null, 9, 0, 8, 14, 11],
	[9, 3, 12, 13, 16, null, null, null, null, null, 10, 10, 6, 12, 9],
	[6, 4, 1, 7, 10, 8, null, 10, 11, 3, 13, 5, 8],
	[2, 4, 6, 15, 15, 3, 9, 12, 2, 14, 6],
	[7, 6, 15, 12, 7, 13, 12, 8, 10]
]



var create_options_table = function (nums) {
	nums = nums || 7
	var options = [[]]
	for (var i = 0; i < nums; i ++) {
		var current_options = []
		for (var k = 0; k < options.length; k ++) {
			var option = options[k]
			if (option.length === 2) {
				current_options.push(option.concat([i]))
			} else if (option.length === 1) {
				current_options.push(option.concat([i]))
				current_options.push(option.concat([i, i]))
			} else if (option.length === 0) {
				current_options.push(option.concat([i]))
				current_options.push(option.concat([i, i]))
				current_options.push(option.concat([i, i, i]))
			}
		}
		options = options.concat(current_options)
		
	}

	puzzle_options = {}
	for (var i = 0; i < options.length; i++) {
		var option = options[i]
		if (option.length === 3) {
			var total = option.reduce(function(a, b) {
  				return a + b;
			})
			if (puzzle_options[total]) {
				puzzle_options[total].push(option)
			} else {
				puzzle_options[total] = [option]
			}

		}
	}
	return puzzle_options
}

window.puzzle_options = create_options_table()

window.build_options_table = function () {
	var $total_temp = $('<ul class="total"></ul>')
	var $option_temp = $('<li class="option active"></li>')
	var $option_total_temp = $('<li class="option-total option active"></li>')
	var $options = $(".options")
	var next = 0

	while(next || next === 0) {
		options = puzzle_options[next].sort().reverse()
		$current_total = $total_temp.clone()

		for (var i = 0; i < options.length; i++) {
			$current_total.append($option_temp.clone().text(options[i].join("")))
			$options.append($current_total)
		}
		$current_total.append($option_total_temp.clone().text(next))

		next = puzzle_options[next + 1] ? next + 1 : null
	}
}

window.build_puzzle_board = function () {
	$triangle = $('<div class="triangle"><p></p><ul class="sides"><li class="side"></li><li class="side"></li><li class="side"></li></ul></div>')
	$board = $(".board")
	var hex = new window.hexagon
	hex.create(4)
	var y = 0
	for (var i = 0; i < hex.height(); i++) {
		var offset
		if (i < 3) {
			offset = 3 - i
		} else if ( i > 4) {
			offset = i - 4
		} else {
			offset = 0
		}
		var x = 0
		y += i === 0 ? 0 : 3.464
		var row = hex.triangles[i]
		for (var j = 0; j < row.length; j++) {
			var triangle = row[i]
			x += j === 0 ? 0 : 2
			$new_tri = $triangle.clone()
			$new_tri.css("left", "" + (x + offset * 2)+ "em")
			$new_tri.css("top", "" + y + "em")

			if ((j % 2 !== 0 && i < 4) || (j % 2 === 0 && i >= 4)) {
				$new_tri.addClass("upsidedown")
			}

			if (test_puzzle[i][j] || test_puzzle[i][j] === 0) {
				$new_tri.find("p").text(test_puzzle[i][j])
				triangle.value = test_puzzle[i][j]
				$board.append($new_tri)
			}
		}
	}

}

window.set_up_handlers = function () {
	var $possibilities = $('<ul class="possibilities"><li class="possibility">0</li><li class="possibility">1</li><li class="possibility">2</li><li class="possibility">3</li><li class="possibility">4</li><li class="possibility">5</li><li class="possibility">6</li></ul>')

	$("body").on("click", "li", function (event) {
		var $el = $(event.currentTarget)
		if($el.find($possibilities).length) {
			// closes possibilities if you click the same node
			$(".side").css("background", "")
			$possibilities.remove()
			return
		} else if ($el.hasClass("possibility")) {
			// sets the value of the posibility to the node
			event.stopPropagation()
			var choice = $el.text()
			var $side = $el.closest(".side")
			$side.text(choice)
			$(".side").css("background", "")
			$side.addClass("guess")
		} else if ($el.hasClass("side")) {
			// opens possibilities if you click side. 
			$(".side").css("background", "")
			$el.css("background", "#AA3939")
			$(".side").css("z-index", 10)
			$el.css("z-index", 20)
			var $tri = $el.closest(".triangle")
			var side_indicator = $el.index()
			var side_assoc

			var left = $el.position().left
            var top = $el.position().top
			var h_mid = top + $el.height / 2
			var width = $el.width()
			var w_mid = left + width / 2

			$el.append($possibilities)
		} else if ($el.hasClass("option-total")) {
			var total = $el.text()
			var $triangles = $(".triangle")
			$triangles.removeClass("inspect")
			for (var i = 0; i < $triangles.length; i++) {
				var $triangle = $($triangles.get(i))
				if ($triangle.text() == total) {
					$triangle.addClass("inspect")
				}
			}
		} else if ($el.hasClass("option")) {
			$el.toggleClass("active")
		}	
	})
}
