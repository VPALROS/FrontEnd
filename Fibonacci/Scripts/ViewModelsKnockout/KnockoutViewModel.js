var viewModel = function () {
    this.number = ko.observable(0);
    this.func = function () {
        var list = FibonacciList(this.number());
        this.result(JSON.stringify(list));
    };
    this.result = ko.observable("");
    this.resetClicks = function () {
        this.result("");
    };

}
ko.applyBindings(viewModel);