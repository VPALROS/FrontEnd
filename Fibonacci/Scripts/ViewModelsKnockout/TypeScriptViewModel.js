///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />
function TypeScriptViewModel() {
    var self = this;
    /**
     * Private functions
     */
    function _calculateDifference(newPrice, lastPrice) {
        if (!lastPrice) {
            lastPrice = newPrice;
        }
        return newPrice - lastPrice;
    }
    ;
    function _updateCurrentPrice(response) {
        if (!response)
            return;
        var newValue = response.bpi["EUR"].rate_float.toString();
        self.price(newValue);
    }
    function _getCurrencyValue() {
        $.ajax({
            type: "GET",
            crossDomain: true,
            dataType: "json",
            url: 'http://api.coindesk.com/v1/bpi/currentprice.json',
            success: _updateCurrentPrice
        });
    }
    ;
    /**
     * Observable parameters
     */
    self.price = ko.observable(localStorage.getItem('lastPrice') || '0');
    self.difference = ko.pureComputed(function () {
        var currentPrice = self.price();
        var lastPrice = localStorage.getItem('lastPrice');
        var change = _calculateDifference(currentPrice, lastPrice);
        return change.toFixed(5);
    });
    self.differencePercentage = ko.pureComputed(function () {
        var difference = self.difference();
        var lastPrice = parseFloat(localStorage.getItem('lastPrice'));
        var percentage = difference * 100 / lastPrice;
        localStorage.setItem('lastPrice', self.price());
        return percentage.toFixed(5) + "%";
    });
    self.icon = ko.pureComputed(function () {
        var difference = self.difference();
        return difference == 0 ? 'equal' : (difference > 0 ? 'up' : 'down');
    });
    //call to get users list when the VM is loading or you can call it on any event on your model
    _getCurrencyValue();
}
;
ko.applyBindings(new TypeScriptViewModel());
//# sourceMappingURL=TypeScriptViewModel.js.map