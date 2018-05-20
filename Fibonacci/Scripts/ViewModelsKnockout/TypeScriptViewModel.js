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
        console.log('updating current value', newValue);
        self.price(newValue);
    }
    function _getCurrencyValue() {
        console.log('getting server value');
        $.ajax({
            type: "GET",
            crossDomain: true,
            dataType: "json",
            url: 'http://api.coindesk.com/v1/bpi/currentprice.json',
            success: _updateCurrentPrice
        });
        //const endpoint = 'http://api.coindesk.com/v1/bpi/currentprice.json';
        //return this.http
        //    .get(endpoint)//, {search: searchParams})
        //    .map(res => res.json().main)
        //    .subscribe(res => {
        //        _updateCurrentPrice
        //    });
    }
    ;
    /**
     * Observable parameters
     */
    self.price = ko.observable(localStorage.getItem('lastPrice') || '0');
    self.difference = ko.pureComputed(function () {
        var currentPrice = self.price();
        console.log('currentPrice', currentPrice);
        var lastPrice = localStorage.getItem('lastPrice');
        console.log('lastPrice', lastPrice);
        var change = _calculateDifference(currentPrice, lastPrice);
        return change.toFixed(5);
    });
    self.differencePercentage = ko.pureComputed(function () {
        var difference = self.difference();
        var lastPrice = parseFloat(localStorage.getItem('lastPrice'));
        var percentage = difference * 100 / lastPrice;
        localStorage.setItem('lastPrice', self.price());
        console.log('percentage', difference);
        return percentage.toFixed(5) + "%";
    });
    self.icon = ko.pureComputed(function () {
        var difference = self.difference();
        console.log('change', difference);
        return difference == 0 ? 'equal' : (difference > 0 ? 'up' : 'down');
    });
    //call to get users list when the VM is loading or you can call it on any event on your model
    _getCurrencyValue();
}
;
ko.applyBindings(new TypeScriptViewModel());
//# sourceMappingURL=TypeScriptViewModel.js.map