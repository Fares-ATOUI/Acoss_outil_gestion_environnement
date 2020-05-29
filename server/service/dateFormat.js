
 
exports.date_format = function (timestamp) {

    var date_not_formatted = new Date(timestamp)
    var formatted_string = date_not_formatted.getFullYear() + "-";

    if (date_not_formatted.getMonth() < 9) {
        formatted_string += "0";
    }
    formatted_string += (date_not_formatted.getMonth() + 1);
    formatted_string += "-";

    if (date_not_formatted.getDate() < 10) {
        formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();

    return formatted_string;
}
//module.exports = date_format
var exports = module.exports 




