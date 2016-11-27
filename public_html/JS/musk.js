/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var REG_FOR_PAN = /^[A-Z0-9a-z]{10}$/;

var REG_FOR_CNAME = /^[A-Z0-9a-z ]{2,50}$/;

var REG_FOR_TIN = /^[A-Z0-9a-z ]{2,50}$/;

var REG_FOR_DATE = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

function bodyClick()
{
    $(".mydropDown").hide();
}

function checkForPAN(Id)
{

    if (!REG_FOR_PAN.test($(Id).val()))
    {
        $(Id).css('border-color', 'red');

    } else
    {
        $(Id).css('border-color', 'rgba(0,0,0,.3)');
    }

}

function checkForName(Id)
{
    if (!REG_FOR_CNAME.test($(Id).val()))
    {
        $(Id).css('border-color', 'red');

    } else
    {
        $(Id).css('border-color', 'rgba(0,0,0,.3)');
    }

}

function checkForDate(Id)
{
    if (!REG_FOR_DATE.test($(Id).val()))
    {
        $(Id).css('border-color', 'red');

    } else
    {
        $(Id).css('border-color', 'rgba(0,0,0,.3)');
    }

}

function checkForTIN(Id)
{
    if (!REG_FOR_TIN.test($(Id).val()))
    {
        $(Id).css('border-color', 'red');

    } else
    {
        $(Id).css('border-color', 'rgba(0,0,0,.3)');
    }

}

function doClick(Id)
{
    setTimeout(function () {

        var slider = $(Id).attr("data-target");

        if ($(slider).css("display") == "none")
        {
            $(slider).css("position", 'absolute');

            $(slider).css("z-index", '20');


            $(slider).removeClass("hidden-xs");

            $(slider).removeClass("hidden-sm");

        } else
        {
            $(slider).addClass("hidden-sm");

            $(slider).addClass("hidden-xs");

            $(slider).css("position", 'relative');

        }
    }, 50);
}


function load()
{
    $("#lgsB").html($("#bGLS").html());

    widthArrahge();

    $("#date").datepicker();
}

function widthArrahge()
{

    $(".width-fill").click(function () {

        $("#silderM").addClass("hidden-sm");

        $("#silderM").addClass("hidden-xs");

    }
    );

    if ($(document).width() < 768)
    {
        $("#dropButtonC").css({
            'border': 'none',
            'border-top': '1px black dashed',
            'margin-top': '30px'
        });
    } else
    {
        $(".mydropDown").hide();

        $("#dropButtonC").css({
            'border': 'none',
            'border-left': '1px black dashed',
            'margin-top': '00px;'
        });
    }
//if  greate than sm
    if ($(document).width() > 992)
    {
        $("#silderM").css("position", 'relative');


    } else
    {
        $("#silderM").css("position", 'absolute');

        $("#silderM").css("z-index", '20');

    }

    $(".width-fill").each(function ()
    {
        if ($(this).prev().css("position") == 'absolute' || $(this).prev().css("display") == "none")
        {
            $(this).css("width", "100vw");

        } else
        {
            $(this).css("width", 'calc(100% - 250px)');
        }

    });
}


function showSuccess(msg)
{
    $("#alertMSG").remove();

    var data = '<div id="alertMSG" class="alert alert-success myalert"><strong>Success!</strong> ' + msg + '</div>';

    $('body').append(data);

    $("#alertMSG").slideDown();

    if ($(document).width() > 500)
    {
        $("#alertMSG").css("width", '500px');

        $("#alertMSG").css("margin-left", $(document).width() / 2 - 250);

    } else
    {
        $("#alertMSG").css("width", '100%');
    }

    setTimeout(function () {
        $("#alertMSG").slideUp();
    }, 2000);
}

function showError(msg)
{
    $("#alertMSG").remove();

    var data = '<div id="alertMSG" class="alert alert-danger myalert"><strong>Fail!</strong> ' + msg + '</div>';

    $('body').append(data);

    $("#alertMSG").slideDown();

    if ($(document).width() > 500)
    {
        $("#alertMSG").css("width", '500px');

        $("#alertMSG").css("margin-left", $(document).width() / 2 - 250);

    } else
    {
        $("#alertMSG").css("width", '100%');
    }

    setTimeout(function () {
        $("#alertMSG").slideUp();
    }, 2000);
}

function exitDrop(Id, ev) {

    ev.preventDefault();

    $(Id).css('background-color', 'white');


}
function allowDrop(Id, ev) {

    ev.preventDefault();

    $(Id).css('background-color', 'lightgray');

}

function clickToUpload()
{
    var input = document.getElementById("textFile");

    fileParser(input.files[0]);
}




function fileParser(input)
{

    $("#pan").css('border-color', 'rgba(0,0,0,.3)');

    $("#cname").css('border-color', 'rgba(0,0,0,.3)');

    $("#date").css('border-color', 'rgba(0,0,0,.3)');

    var reader = new FileReader();

    reader.onload = function () {

        var text = reader.result;

        var lines = text.split("\n");

        if (lines.length > 3 || lines.length == 0)
        {
            showError("File formate not correct");

        } else
        {
            var i = 0;

            var done = true;

            while (i < lines.length)
            {
                var d = lines[i].split("=");

                if (d.length != 2)
                {
                    showError("File formate not correct");

                    done = false;

                    return;

                }
                var key = d[0].trim();

                var val = d[1].trim();

                switch (key)
                {
                    case 'pan':

                        $("#pan").val(val);

                        if (!REG_FOR_PAN.test(val))
                        {
                            showError("PAN Number not corrent.");

                            done = false;

                            $("#pan").css('border-color', 'red');
                        }


                        break;
                    case 'name':

                        $("#cname").val(val);

                        if (!REG_FOR_CNAME.test(val))
                        {
                            showError("Company not corrent.");

                            done = false;

                            $("#cname").css('border-color', 'red');
                        }


                        break;
                    case 'date':

                        $("#date").val(val);

                        if (!REG_FOR_DATE.test(val))
                        {
                            showError("Date not corrent.");

                            done = false;

                            $("#date").css('border-color', 'red');
                        }


                        break;
                }
                i++;

            }
            if ($("#cname").val() == "")
            {
                showError("all Field required");
                $("#cname").css('border-color', 'red');
            } else if ($("#date").val() == "")
            {
                showError("all Field required");
                $("#date").css('border-color', 'red');
            } else if ($("#pan").val() == "")
            {
                showError("all Field required");
                $("#pan").css('border-color', 'red');
            } else
            if (done)
                handleFileSelect(input);

        }

    };
    reader.readAsText(input);
}


function doDrop(Id, ev)
{

    $(Id).css('background-color', 'white');

    var input = ev.dataTransfer;

    fileParser(input.files[0]);

    ev.preventDefault();
}


function handleFileSelect(file) {



    // files is a FileList of File objects
    $("#trD").show();

    $.ajax({
        url: 'https://content.dropboxapi.com/2/files/upload',
        type: 'post',
        data: file,
        processData: false,
        contentType: 'application/octet-stream',
        headers: {
            "Authorization": "Bearer i6nsDX1nh1AAAAAAAAAACGMM1tmOCxKHD0KSa6Ev3A_Tfpn-Q6YBMBLDoAD3oitM",
            "Dropbox-API-Arg": '{"path": "/' + new Date().getTime() + '/' + 'uploaded' + ".txt" + '","mode": "add"}'

        },
        success: function (data) {
            $("#trD").hide();
            showSuccess("file uploading done");


        },
        error: function (data) {

            $("#trD").hide();
            showError("file uploading failed");
        }
    })

}

