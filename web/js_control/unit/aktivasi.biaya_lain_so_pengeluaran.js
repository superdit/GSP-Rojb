$("#daterange").daterangepicker({
    locale: {
      format: "DD/MM/YYYY"
    }
});

$(function() {
    // control search
    $("#btnSearch").click(function(e) {
        e.preventDefault();
        var daterange = $("#daterange").val().split(" ").join("");
        var datesplit = daterange.split("-");
        var datesplit1 = datesplit[0].split("/");
        var datesplit2 = datesplit[1].split("/");

        var fromdate = datesplit1[2] + "-" + datesplit1[1] + "-" + datesplit1[0];
        var todate = datesplit2[2] + "-" + datesplit2[1] + "-" + datesplit2[0];
        var keysearch = $("#keySearch").val().trim();
        if (keysearch.length == 0)
            keysearch = "_";

        window.location.href = WEB_URL+"unit/aktivasi/so/biaya_lain/pengeluaran?key="+keysearch+"&from_date="+fromdate+"&to_date="+todate;
        //console.log(daterange, datesplit, datesplit1, datesplit2, fromdate, todate, keysearch);
    });

    // control no_kw click
    $(".no_kw").click(function(e) {
        e.preventDefault();
        var no_kuitansi = $(this).text().replace(/\//g, "-");
        window.open(WEB_URL + "unit/aktivasi/so/biaya_lain/kuitansi/" + no_kuitansi, "Cetak Kuitansi", "height=650,width=850");
        //console.log($(this).text());
    });
});