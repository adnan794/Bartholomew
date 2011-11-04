var carousel_slideshow;
var carousel_thumbs;
var currentItem=0;
var leftPos=0;

function update_carousel_position(newPos)
{
	var total=$(carousel_thumbs+' .thumb').length;
	if (newPos < 0)
		newPos = 0;

	if (newPos > (total-7))
		newPos = (total-7);

	var oldX=-leftPos * 132;
	var newX=-newPos * 132;
	$(carousel_thumbs).stop().animate({'margin-left':newX}, 1000, 'easeOutCubic');
	leftPos=newPos;
}

function select_item(i)
{
	$(carousel_thumbs+' .selected').removeClass('selected');
	var current=$(carousel_thumbs+' .thumb').eq(i);
	current.addClass('selected');
	var left=current.position().left;
	currentItem=i;
	left-=21;
	if (left >= (7*132))
	{
		update_carousel_position(leftPos+Math.floor(left/132));
	}
	if (left < 0)
	{
		update_carousel_position(leftPos+Math.floor(left/132));
	}
}

function click_thumb(element)
{
	var thumbIndex=$(carousel_thumbs+' .thumb').index(element) + 1;
	var sliderObject=$(carousel_slideshow).data('slider');
	sliderObject.callSlide(thumbIndex+' ');
}

function clickleft()
{
	update_carousel_position(leftPos-7);
}

function clickright()
{
	update_carousel_position(leftPos+7);
}

function carousel(slideshow, thumbs)
{
	carousel_slideshow=slideshow;
	carousel_thumbs=thumbs;
	$(thumbs).wrap('<div class="carousel" />');
	$(thumbs).wrap('<div class="thumbs_wrap" />');
	$(thumbs+' div').each(function(i,val){
		$(val).addClass('thumb');
		$(val).bind('click', function(){click_thumb(this);});
	});
	$(thumbs).parent().parent().prepend('<div class="left"><a href="#left">&nbsp;</a></div>');
	$(thumbs).parent().parent().append('<div class="right"><a href="#right">&nbsp;</a></div>');
	$(thumbs).parent().parent().children('.left').children('a').bind('click', function(){clickleft();return false;});
	$(thumbs).parent().parent().children('.right').children('a').bind('click', function(){clickright();return false;});
	select_item(0);
	$(".slider").bind("sliderChange", function(event, curSlide)
	{
		var slideIndex=$(carousel_slideshow+' div').index($(curSlide));
		select_item(slideIndex);
	});
}
