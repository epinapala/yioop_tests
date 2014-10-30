var x = require('casper').selectXPath;
//casper.options.viewportSize = {width: 1280, height: 661};
//casper.options.verbose = true;
i = 0;
casper.options.logLevel = "debug";
casper.test.begin('Yioop Login Test...', function(test) {
  casper.start('http://localhost/yioop/');
  casper.waitForSelector(x("//a[normalize-space(text())='Sign In']"),
    function success() {
      test.assertExists(x("//a[normalize-space(text())='Sign In']"));
      this.click(x("//a[normalize-space(text())='Sign In']"));
    },
    function fail() {
      test.assertExists(x("//a[normalize-space(text())='Sign In']"));
    });
  casper.waitForSelector("form input[name='u']",
    function success() {
      test.assertExists("form input[name='u']");
      this.click("form input[name='u']");
    },
    function fail() {
      test.assertExists("form input[name='u']");
    });
  casper.waitForSelector("input[name='u']",
    function success() {
      this.sendKeys("input[name='u']", "root");
    },
    function fail() {
      test.assertExists("input[name='u']");
    });
  casper.waitForSelector("input[name='p']",
    function success() {
      this.sendKeys("input[name='p']", "Usharani7*");
    },
    function fail() {
      test.assertExists("input[name='p']");
    });
  casper.waitForSelector("form button",
    function success() {
      test.assertExists("form button");
      this.click("form button");
    },
    function fail() {
      test.assertExists("form button");
    });

  //User logged in, assert tests for logged in actions


  casper.waitForSelector(x("//a[normalize-space(text())='Manage Groups']"),
    function success() {
      c(this, "user_logged_in.jpg")
      test.assertExists(x("//a[normalize-space(text())='Manage Groups']"));

      this.click(x("//a[normalize-space(text())='Manage Groups']"));
    },
    function fail() {
      test.assertExists(x("//a[normalize-space(text())='Manage Groups']"));
    });

  casper.waitForSelector(x('//*[@id="group-form"]/table/tbody/tr[1]/td[2]/button'),
    function success() {
      c(this, "manage_groups.jpg")
      test.assertExists(x('//*[@id="group-form"]/table/tbody/tr[1]/td[2]/button'));
      this.click(x('//*[@id="group-form"]/table/tbody/tr[1]/td[2]/button'));
    },
    function fail() {
      console.log('fail');
    });



  casper.waitForSelector('#page_name',
    function success() {
      c(this, "help_now_open.jpg")
      test.assertExists(x('//*[@id="page_name"]/a'));
      this.click(x('//*[@id="page_name"]/a'));
    },
    function fail() {
      test.assertExists(x('//*[@id="page_name"]/a'));
    });
  casper.waitForSelector(x("//a[normalize-space(text())='Read']"),
    function success() {
      c(this, "on_edit_page.jpg")
      test.assertExists(x("//a[normalize-space(text())='Read']"));
      this.click(x("//a[normalize-space(text())='Read']"));
    },
    function fail() {
      test.assertExists(x("//a[normalize-space(text())='Read']"));
    });
  casper.waitForSelector(x("//a[normalize-space(text())='Back']"),
    function success() {
      c(this, "user_on_read_page.jpg")
      test.assertExists(x("//a[normalize-space(text())='Back']"));
      this.click(x("//a[normalize-space(text())='Back']"));
    },
    function fail() {
      test.assertExists(x("//a[normalize-space(text())='Back']"));
    });
  casper.waitForSelector(x("//a[normalize-space(text())='X']"),
    function success() {
      c(this, "user_back_to_help_open_view.jpg")
      test.assertExists(x("//a[normalize-space(text())='X']"));
      this.click(x("//a[normalize-space(text())='X']"));
    },
    function fail() {
      test.assertExists(x("//a[normalize-space(text())='X']"));
    });

  //Log out of Yioop
  casper.waitForSelector(
    "body > div.top-bar > div > ul > li:nth-child(3) > a",
    function success() {
      test.assertEquals(this.getHTML("body > div.top-bar > div > ul > li:nth-child(3) > a"),
        "Sign Out",
        "Sign Out Link exists");
      this.click("body > div.top-bar > div > ul > li:nth-child(3) > a");
    },
    function fail() {
      test.assertEquals(this.getHTML("body > div.top-bar > div > ul > li:nth-child(3) > a"),
        "Sign Out",
        "Sign Out Link exists");
    });

  //once signed out , wait until log out mesage appears
  casper.waitForSelector(
    'div#message > h1.red',
    function success() {
      test.assertEquals(this.getHTML('div#message > h1.red'),
        'Logout Successful!!',
        "Logout message valid")
    }, function then() { // step to execute when check() is ok
      c(this, "logout_message.jpg");
    },
    function fail() {
      test.assertExists('div#message > h1.red', "Message Exists");
    }
  );

  casper.test.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
  });

  casper.test.on('fail', function() {
    casper.capture('fail.png');
  });

  casper.run(function() {
    test.done();
  });
});


function c(that, file_name) {
  that.capture("screenshots/"+i + "_" + file_name);
  i++;
  return;
}