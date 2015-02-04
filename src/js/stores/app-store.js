var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge =require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT="change";

var _catalog = [
	{id:1, title:'widget #1', cost:1},
	{id:2, title:'widget #2', cost:2},
	{id:3, title:'widget #3', cost:3}
];

var _cartitems = [];

function _removeItem(index){
	_cartitems[index].inCart =false;
	_cartitems.splice(index,1);
}

function _increaseItem(index){
	_cartitems[index].qty++;
}


function _decreaseItem(index){
	if(_cartitems[index].qty>1){
	_cartitems[index].qty--;
	}
	else{
		_removeItem(index);
	}
}

function _addItem(item){
	if(!item.inCart){
		item['qty'] = 1;
		item['inCart'] = true;
		_cartitems.push(item);
	}
	else
	{
		_cartitems.forEach(function(cartItem,i){
			if(cartItem.id===item.id){
				_increaseItem(i);
			}

		});
	}

}

var AppStore = merge(EventEmitter.prototype, {
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback){
		this.removeChangeListener(CHANGE_EVENT,callback);
	},

	getCart: function(callback){
		return _cartitems;
	},
	getCatalog: function(callback){
		return _catalog;
	},

	dispatcherIndex: AppDispatcher.register(function(payload){
		var action = payload.action;
		switch (action.actionType){
			case AppConstants.ADD_ITEM:
				_addItem(payload.action.item);
				break;
			case AppConstants.REMOVE_ITEM:
				_removeItem(payload.action.index);
				break;
			case AppConstants.INCREASE_ITEM:
        		_increaseItem(payload.action.index);
        		break;
      		case AppConstants.DECREASE_ITEM:
        		_decreaseItem(payload.action.index);
        		break;
		}
		AppStore.emitChange();
		return true;
	})

})

module.exports = AppStore;



