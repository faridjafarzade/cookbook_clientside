'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _receiptAction = require('../../actions/receiptAction');

var receiptAction = _interopRequireWildcard(_receiptAction);

var _crossFetch = require('cross-fetch');

var _crossFetch2 = _interopRequireDefault(_crossFetch);

var _reactRouterDom = require('react-router-dom');

require('../../assets/css/semantic.css');

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/faridjafarzade/Documents/cookbook/pages/index.js?entry';


var Add = function (_Component) {
        (0, _inherits3.default)(Add, _Component);

        function Add(props) {
                (0, _classCallCheck3.default)(this, Add);

                var _this = (0, _possibleConstructorReturn3.default)(this, (Add.__proto__ || (0, _getPrototypeOf2.default)(Add)).call(this, props));

                _this.titleChange = _this.titleChange.bind(_this);
                _this.descriptionChange = _this.descriptionChange.bind(_this);
                _this.handleSubmit = _this.handleSubmit.bind(_this);

                _this.state = {
                        title: _this.props.location.state.title,
                        description: _this.props.location.state.description,
                        id: _this.props.location.state.id,
                        serverError: 0,
                        titleError: false,
                        descriptionError: false
                };

                return _this;
        }

        (0, _createClass3.default)(Add, [{
                key: 'descriptionChange',
                value: function descriptionChange(e) {

                        this.setState({
                                description: e.target.value,
                                serverError: 0,
                                descriptionError: false
                        });

                        if (!e.target.value.match(/^[0-9A-Za-z,\ \n\.\-\/:\(\)]+$/)) {
                                this.setState({
                                        descriptionError: true,
                                        serverError: 1000
                                });
                        }
                }
        }, {
                key: 'titleChange',
                value: function titleChange(e) {

                        this.setState({
                                title: e.target.value,
                                serverError: 0,
                                titleError: false
                        });

                        if (!e.target.validity.valid) {
                                this.setState({
                                        titleError: true,
                                        serverError: 1000
                                });
                        }
                }
        }, {
                key: 'handleSubmit',
                value: function handleSubmit(e) {
                        e.preventDefault();
                        var clone = this;
                        if (!this.state.titleError && !this.state.descriptionError) if (this.state.title === '' || this.state.description === '') this.setState({ serverError: 999 });else (0, _crossFetch2.default)('http://www.maskeddream.com/cookbook/apis/receipt_api.php?action=save&description=' + this.state.description + '&title=' + this.state.title + '&receipt_id=' + this.state.id).then(function (data) {
                                data = JSON.parse(data._bodyInit);

                                if (data.http_status_codes === 201) {
                                        var receipt = {
                                                title: data.receipt.title,
                                                description: data.receipt.description,
                                                id: data.receipt.id
                                        };

                                        clone.setState({
                                                title: '',
                                                description: '',
                                                serverError: 0
                                        });

                                        clone.props.createReceipt(receipt);

                                        clone.props.history.push({
                                                pathname: '/receiptpage',
                                                state: { title: data.receipt.title, id: data.receipt.id, description: data.receipt.description }
                                        });
                                } else {
                                        clone.setState({ serverError: data.http_status_codes });
                                }
                        }).catch(function (err) {
                                clone.setState({
                                        serverError: 666
                                });
                        });
                }
        }, {
                key: 'getServerMessage',
                value: function getServerMessage() {

                        if (this.state.serverError === 204) return _react2.default.createElement(_semanticUiReact.Message, {
                                error: true,
                                header: 'Action Forbidden',
                                content: 'Fill all fields !',
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 115
                                }
                        });else if (this.state.serverError === 400) return _react2.default.createElement(_semanticUiReact.Message, {
                                error: true,
                                header: 'Server Error',
                                content: 'There is wrong something !!',
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 121
                                }
                        });else if (this.state.serverError === 666) return _react2.default.createElement(_semanticUiReact.Message, {
                                error: true,
                                header: 'Error',
                                content: 'There is wrong something !!',
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 127
                                }
                        });else if (this.state.serverError === 999) return _react2.default.createElement(_semanticUiReact.Message, {
                                error: true,
                                header: 'Error',
                                content: 'Don\'t send empty fields',
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 133
                                }
                        });else if (this.state.serverError === 1000) return _react2.default.createElement(_semanticUiReact.Message, {
                                error: true,
                                header: 'Error',
                                content: 'Only letters, digits and [,],[.],[(],[)] are accepted ! ',
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 139
                                }
                        });else return '';
                }
        }, {
                key: 'render',
                value: function render() {
                        var clone = this;
                        return _react2.default.createElement('div', {
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 153
                                }
                        }, _react2.default.createElement('h3', {
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 154
                                }
                        }, 'Add Receipt'), _react2.default.createElement('form', { onSubmit: this.handleSubmit, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 155
                                }
                        }, _react2.default.createElement(_semanticUiReact.Form, { error: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 156
                                }
                        }, _react2.default.createElement(_semanticUiReact.Form.Field, { type: 'text', pattern: '[0-9A-Za-z\\s,\\.\\-\\/:\\(\\)]*', error: clone.state.titleError, value: this.state.title, onChange: this.titleChange, label: 'Title', control: 'input', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 157
                                }
                        }), _react2.default.createElement(_semanticUiReact.Form.Field, { error: clone.state.descriptionError, value: this.state.description, onChange: this.descriptionChange, label: 'Description of receipt ', control: 'textarea', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 158
                                }
                        }), _react2.default.createElement(_semanticUiReact.Button, { type: 'submit', fluid: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 159
                                }
                        }, 'Save'), clone.getServerMessage())), _react2.default.createElement('hr', {
                                __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 163
                                }
                        }));
                }
        }]);

        return Add;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
        return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return {
                createReceipt: function createReceipt(receipt) {
                        return dispatch(receiptAction.createReceipt(receipt));
                }
        };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Add));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiY29ubmVjdCIsInJlY2VpcHRBY3Rpb24iLCJmZXRjaCIsIndpdGhSb3V0ZXIiLCJGb3JtIiwiQnV0dG9uIiwiTWVzc2FnZSIsIkFkZCIsInByb3BzIiwidGl0bGVDaGFuZ2UiLCJiaW5kIiwiZGVzY3JpcHRpb25DaGFuZ2UiLCJoYW5kbGVTdWJtaXQiLCJzdGF0ZSIsInRpdGxlIiwibG9jYXRpb24iLCJkZXNjcmlwdGlvbiIsImlkIiwic2VydmVyRXJyb3IiLCJ0aXRsZUVycm9yIiwiZGVzY3JpcHRpb25FcnJvciIsImUiLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwibWF0Y2giLCJ2YWxpZGl0eSIsInZhbGlkIiwicHJldmVudERlZmF1bHQiLCJjbG9uZSIsInRoZW4iLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiX2JvZHlJbml0IiwiaHR0cF9zdGF0dXNfY29kZXMiLCJyZWNlaXB0IiwiY3JlYXRlUmVjZWlwdCIsImhpc3RvcnkiLCJwdXNoIiwicGF0aG5hbWUiLCJjYXRjaCIsImVyciIsImdldFNlcnZlck1lc3NhZ2UiLCJtYXBTdGF0ZVRvUHJvcHMiLCJvd25Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTOztBQUNULEFBQU87O0lBQVAsQUFBWSxBQUFtQjs7QUFDL0IsQUFBTzs7OztBQUNQLEFBQVM7O0FBSVQsQUFBTzs7QUFDUCxBQUFVLEFBQU8sQUFBUTs7Ozs7Ozs7O0lBRW5CLEE7cUNBRUM7O3FCQUFBLEFBQVksT0FBTTtvREFBQTs7NElBQUEsQUFFTCxBQUVMOztzQkFBQSxBQUFLLGNBQVksTUFBQSxBQUFLLFlBQUwsQUFBaUIsS0FBbEMsQUFDQTtzQkFBQSxBQUFLLG9CQUFrQixNQUFBLEFBQUssa0JBQUwsQUFB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