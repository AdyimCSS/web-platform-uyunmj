function fn_jump_content_init() {
  // data
  const root = $('.box-jump-content-cms');
  const topStep = $('.box-jump-content-cms .box-how-to-step');
  const topItem = $('.box-jump-content-cms .one-how-to-step');

  // view
  fn_create_quick_jump(root);

  // ctrl
  topItem.on('click', function (e) {
    e.preventDefault();

    // console.log($(this).data('target'));

    // disable because scroll track class active
    // topStep X
    // gsap.to(topStep, { duration: 0.5, scrollTo: { x: this } });

    // window scroll Y
    gsap.to(window, { duration: 0.5, scrollTo: $(this).data('target') });

    // console.log(root.data('quickID'));

    $('#' + root.data('quickID'))
      .find('.one_quick')
      .removeClass('active');

    $('#' + root.data('quickID'))
      .find('.one_quick[data-target="' + $(this).data('target') + '"]')
      .addClass('active');
  });

  $(window).on('scroll', function (e) {
    let stepOffset = topStep.offset().top;
    let stepHeight = topStep.height();
    let stepChk = stepOffset + stepHeight;
    let st = $(window).scrollTop();

    // console.log(st >= stepChk);

    // check visible
    if (st >= stepChk) {
      if (!$('#' + root.data('quickID')).hasClass('show_quick')) {
        $('#' + root.data('quickID')).addClass('show_quick');
      }
    } else {
      if ($('#' + root.data('quickID')).hasClass('show_quick')) {
        $('#' + root.data('quickID')).removeClass('show_quick');
      }
    }

    // check active
    root.find('.one-content-step').each(function (key, ele) {
      if ($(ele).offset().top >= st) {
        // clear
        $('#' + root.data('quickID') + ' .one_quick').removeClass('active');

        // add
        $('#' + root.data('quickID') + ' .one_quick')
          .eq(key)
          .addClass('active');

        // console.log('select index = ' + key);

        // scrollX
        // console.log('#' + $(ele).attr('id'));
        gsap.to(topStep, {
          duration: 0.5,
          scrollTo: {
            x: $(
              '.box-jump-content-cms .one-how-to-step[data-target="#' +
                $(ele).attr('id') +
                '"]'
            ),
          },
        });

        return false;
      }
    });
  });

  // function
  function fn_create_quick_jump(_target) {
    // data
    let quick_id = 'quick_jump_' + parseInt(Math.random() * 999999);
    let html = '';
    html += '<div id=' + quick_id + ' class="quick_jump">';
    topItem.each(function (key, ele) {
      html +=
        '<div class="one_quick" data-target="' + $(ele).data('target') + '">';
      html += '<img src="' + $(ele).data('img') + '" alt="" />';
      html += '</div>';
    });
    html += '</div>';

    // view
    _target.data('quickID', quick_id);
    $('body').append(html);

    // ctrl
    $('.one_quick').on('click', function (e) {
      e.preventDefault();

      // disable because scroll track class active
      // $('.one_quick').removeClass('active');
      // $(this).addClass('active');

      // console.log($(this).data('target'));

      // disable because scroll track class active
      // topStep X
      // gsap.to(topStep, {
      //   duration: 0.5,
      //   scrollTo: {
      //     x: $(
      //       '.box-jump-content-cms .one-how-to-step[data-target="' +
      //         $(this).data('target') +
      //         '"]'
      //     ),
      //   },
      // });

      // window scroll Y
      gsap.to(window, { duration: 0.5, scrollTo: $(this).data('target') });
    });
  }
}

fn_jump_content_init();
