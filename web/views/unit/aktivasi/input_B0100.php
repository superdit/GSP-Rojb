<div class="row nopadding btemplate" id="b0template" style="margin-bottom:5px;">
    <div class="col-sm-2"></div>
    <div class="col-sm-6">
        <input type="text" class="form-control" id="keterangan" name="keterangan[]" placeholder="Keterangan" style="text-transform:uppercase;">
    </div>

    <div class="col-sm-3" style="padding:0;">
        <label class="control-label pull-left">Q:&nbsp;&nbsp;</label>
        <input type="text" style="width:60px;text-align:center;" class="form-control pull-left" id="qty" name="qty[]" placeholder="Qty" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
        <label class="control-label pull-left">&nbsp;&nbsp;&nbsp;&nbsp;RP:&nbsp;&nbsp;</label>
        <input type="text" style="width:110px;" class="form-control price" id="harga" name="harga[]" placeholder="Harga">
    </div>

    <div class="col-sm-1">
        <a href="" class="btn btn-success btn-sm pull-right" id="addrow"><i class="fa fa-fw fa-plus"></i></a>
        <a href="" class="btn btn-danger btn-sm pull-right initdel" style="display:none;" id="deleterow"><i class="fa fa-fw fa-close"></i></a>
    </div>
</div>

<div class="septemplate"></div>