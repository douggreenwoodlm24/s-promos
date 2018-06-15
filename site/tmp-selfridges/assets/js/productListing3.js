var ProductInfo = [{
    operating_system: "ios",
    manufacturer: "Apple",
    name: "101"
},
{
    operating_system: "windows",
    manufacturer: "Microsoft",
    name: "x101"
},
{
    operating_system: "android",
    manufacturer: "Sony",
    name: "234"
},
{
    operating_system: "other",
    manufacturer: "Samsung",
    name: "100"
},
{
    operating_system: "android",
    manufacturer: "htc",
    name: "455"
}];

//var productsData = "assets/js/productListing.json";
//$.getJSON(productsData, function (json) {

var productOSsArray = [];
var productManufacturersArray = [];

// adding unique productOSs to productOSsArray
$.each(ProductInfo, function (index) {
    var productOS = ProductInfo[index].operating_system;
    if ($.inArray(productOS, productOSsArray) == -1) {
        productOSsArray.push(productOS);
    }
});
//sorting the productOS 
productOSsArray.sort();
var $productOSDropDown = $("#DropDown_operating_system");
var $productManufacturerDropDown = $("#DropDown_manufacturer");
var $container = $("#details").find("tbody");
// append the productOSs to select
$.each(productOSsArray, function (i) {
    $productOSDropDown.append('<option value="' + productOSsArray[i] + '">' + productOSsArray[i] + '</option>');
});

$productOSDropDown.change(function () {
    var selecedproductOS = this.value;
    //filter based on  selected productOS.
    productManufacturersArray = jQuery.grep(ProductInfo, function (product, i) {
        return product.operating_system == selecedproductOS;
    });
    $productManufacturerDropDown.empty();
    $productManufacturerDropDown.append('<option>None</option>');
    for (var i = 0; i < productManufacturersArray.length; i++) {
        $productManufacturerDropDown.append('<option value="' + productManufacturersArray[i].manufacturer + '">' + productManufacturersArray[i].manufacturer + '</option>');
    }
    updateTable(productManufacturersArray);
});

$productManufacturerDropDown.change(function () {
    var selecedmanufacturer = this.value;
    //filter select based on selected manufacturer
    selecedArray = jQuery.grep(ProductInfo, function (product, i) {
        return product.manufacturer == selecedmanufacturer;
    });
    updateTable(selecedArray);

});
//To update the table element with selected items
updateTable = function (collaction) {
    $container.empty();
    for (var i = 0; i < collaction.length; i++) {
        $container.append("<tr><td>" + collaction[i].operating_system + "</td><td> " + collaction[i].manufacturer + "</td><td>" + collaction[i].name + "</td></tr>");
    }
}