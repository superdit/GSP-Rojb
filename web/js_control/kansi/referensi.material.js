$(function() {

    // apply harga to rupiah format
    maskRupiah("inputHarga");
    
    // control show/hide new add form
    $("#btnBaru").click(function(e) {
        e.preventDefault();

        if ($("#btnBaru span").text() == "BARU") {
            // load auto generate kode biaya
            var param = {
                type: "REFERENSI-MATERIAL",
                token: TOKEN
            };

            $.ajax({
                url: API_URL + "util/autonumber/create",
                method: "POST",
                dataType: "JSON",
                data: JSON.stringify(param),
                success: function(r) {
                    $("#inputKode").val(r.result.auto_number);
                }
            });

            $("#btnSimpan").removeAttr("disabled");
            $("#btnSimpan").attr("data-action", "new");
            $("#btnBaru i").removeClass("fa-plus").addClass("fa-ban");
            $("#btnBaru span").text("BATAL");
            //$("#box-form").slideDown("fast");
            $("#box-form-title").text("BUAT MATERIAL BARU");
        } else {
            $("#inputKode, #inputJenis, #inputHarga, #inputSatuan, #inputRedline").val("");
            $("#btnSimpan").attr("disabled", "true");
            $("#btnBaru i").removeClass("fa-ban").addClass("fa-plus");
            $("#btnBaru span").text("BARU");
            //$("#box-form").slideUp("fast");
            $("#box-form-title").text("FORM POP");
        }
    });

    // control insert new data
    $("#btnSimpan").click(function(e) {
        
        if ($("#btnSimpan").attr("disabled") != "disabled") {

            var btnAction = $("#btnSimpan").attr("data-action");

            if (btnAction == "new") {
                var param = {
                    kode: $("#inputKode").val(),
                    jenis: $("#inputJenis").val(),
                    satuan: $("#inputSatuan").val(),
                    harga: $("#inputHarga").val().split(".").join(""),
                    red_line: $("#inputRedline").val(),
                    token: TOKEN
                };

                $.ajax({
                    url: API_URL + "referensi/material/add",
                    method: "POST",
                    dataType: "JSON",
                    data: JSON.stringify(param),
                    success: function(r) {

                        if (!r.success)
                            notifLobi("error", "top right", r.message);
                        else {
                            $("#btnBaru").trigger("click");
                            notifLobi("success", "top right", r.message);

                            // append table
                            var newRow = '<tr>'+
                                '<td style="text-align:center;">'+r.result.kode+'</td>'+
                                '<td><span id="text-'+r.result.kode+'">'+r.result.jenis+'</span></td>'+
                                '<td style="text-align:center;"><span id="satuan-'+r.result.kode+'">'+r.result.satuan+'</span></td>'+
                                '<td><span id="harga-'+r.result.kode+'">'+toRupiah(r.result.harga)+'<span></td>'+
                                '<td><span id="redline-'+r.result.kode+'">'+r.result.red_line+'<span></td>'+
                                '<td style="text-align:right;">'+
                                    '<button class="btn btn-default btn-xs btnRefEdit" data-kode="'+r.result.kode+'" data-jenis="'+r.result.jenis+'" data-harga="'+r.result.harga+'" data-satuan="'+r.result.satuan+'" data-redline="'+r.result.red_line+'"><i class="fa fa-edit"></i></button>'+
                                    '<button class="btn btn-default btn-xs btnRefDelete" data-kode="'+r.result.kode+'"><i class="fa fa-trash-o"></i></button>'+
                                '</td>'+
                            '</tr>';
                            $("#tb-ref").append(newRow);

                            bindEdit();                            
                            bindDelete();
                        }
                    }
                });
            } else if (btnAction == "edit") {
                var param = {
                    new_kode: $("#inputKode").val(),
                    jenis: $("#inputJenis").val(),
                    satuan: $("#inputSatuan").val(),
                    harga: $("#inputHarga").val().split(".").join(""),
                    red_line: $("#inputRedline").val(),
                    token: TOKEN
                };

                $.ajax({
                    url: API_URL + "referensi/material/edit/" + $("#inputKode").val(),
                    method: "POST",
                    dataType: "JSON",
                    data: JSON.stringify(param),
                    success: function(r) {

                        if (!r.success)
                            notifLobi("error", "top right", r.message);
                        else {
                            $("#btnBaru").trigger("click");
                            notifLobi("success", "top right", r.message);                          

                            $("#text-"+r.result.kode).text(r.result.jenis);
                            $("#harga-"+r.result.kode).text(toRupiah(r.result.harga));
                            $("#satuan-"+r.result.kode).text(r.result.satuan);
                            $("#redline-"+r.result.kode).text(r.result.red_line);
                            $("[data-kode="+r.result.kode+"]").attr("data-jenis", r.result.jenis);
                            $("[data-kode="+r.result.kode+"]").attr("data-harga", r.result.harga);
                            $("[data-kode="+r.result.kode+"]").attr("data-satuan", r.result.satuan);
                            $("[data-kode="+r.result.kode+"]").attr("data-redline", r.result.red_line);
                            bindEdit();
                        }
                    }
                });
            }
        }
    });

    // control button search
    $("#btnSearch").click(function(e) {
        e.preventDefault();
        if ($("#keySearch").val().length > 0)
            window.location.href = WEB_URL+"kansi/referensi/material?key="+$("#keySearch").val();
    });

    // control button clear search
    $("#btnClearSearch").click(function(e) {
        e.preventDefault();
        window.location.href = WEB_URL+"kansi/referensi/material";
    });

    // control key search value enter key
    $("#keySearch").keypress(function(e) {
        if(e.which == 13) 
            $("#btnSearch").trigger("click");
    });
});


// control edit button
function bindEdit() {
    $(".btnRefEdit").bind("click", function(e) {

        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "fast");
        
        $("#btnSimpan").removeAttr("disabled");
        $("#btnSimpan").attr("data-action", "edit");
        $("#btnBaru i").removeClass("fa-plus").addClass("fa-ban");
        $("#btnBaru span").text("BATAL");
        $("#box-form").slideDown("fast");

        $("#inputKode").val($(this).attr("data-kode"));
        $("#inputJenis").val($(this).attr("data-jenis"));
        $("#inputSatuan").val($(this).attr("data-satuan"));
        $("#inputHarga").val(toRupiah($(this).attr("data-harga")));
        $("#inputRedline").val($(this).attr("data-redline"));
        
        $("#box-form-title").text("EDIT MATERIAL");
    });
}

bindEdit();

// control delete button 
function bindDelete() {
    $(".btnRefDelete").bind("click", function(e) {
        e.preventDefault();
        var element = $(this);
        var kode = element.attr("data-kode");
        $.confirm({
            title: "Konfirmasi",
            content: "<div style='text-align:center'>Apakah material "+kode+" akan dihapus?</div>",
            buttons: {
                batal: function () {
                },
                hapus: function () {
                    var param = {
                        token: TOKEN
                    };

                    $.ajax({
                        url: API_URL + "referensi/material/delete/" + kode,
                        method: "POST",
                        dataType: "JSON",
                        data: JSON.stringify(param),
                        success: function(r) {
                            if (!r.success)
                                notifLobi("error", "top right", r.message);
                            else {
                                element.parent().parent().remove();
                                notifLobi("success", "top right", r.message);
                            }
                        }
                    });
                }
            }
        });
    });
}

bindDelete();