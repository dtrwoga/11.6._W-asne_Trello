$(function() {

    // 1. GENEROWANIE ID

    function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

	// 2. IMPLEMENTACJA KLASY COLUMN

	function Column(name) {
    	var self = this; // useful for nested functions

	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();

    	function createColumn() {
    	
    	// tworzenie elementów, z których będzie składała się kolumna
		
			var $column = $('<div>').addClass('column');//tworzymy $element.$column, który będzie divem z klasą 'column'
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);//tworzymy tytuł kolumny, który znajduje się we właściwości name (Dostaniemy się do niej przez zmienną self)
			var $columnCardList = $('<ul>').addClass('column-card-list');//lista na kartki
			var $columnDelete = $('<button>').addClass('btn-delete').html('<i class="fa fa-trash-o"></i>');//przycisk usuwania listy
			var $columnAddCard = $('<p>').addClass('add-card').text('Add a card');//przycisk dodawania nowej karty

		// Podpinanie zdarzeń

			//Kasowanie kolumny po kliknięciu w przycisk
			$columnDelete.click(function() {
    		    self.removeColumn();
			});
			//Add a note after clicking on the button:
			$columnAddCard.click(function() {
		    	self.addCard(new Card(prompt("Enter the name of the card")));
			});	

		//Konstruowanie kolumny

			$column.append($columnTitle)
			        .append($columnDelete)
			        .append($columnAddCard)
			        .append($columnCardList);
			
		// Return of created column
			
			return $column;//UWAGA! Element kolumny należy zwrócić! (return $column). 
			//Bez tego nie mielibyśmy odniesienia do stworzonego elementu tam, gdzie wywołujemy funkcję.

		}//koniec funkcji createColumn

  	}//koniec funkcji Column

  	//METODY DLA KLASY COLUMN

  	Column.prototype = {
  		addCard: function(card) {
	    	this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
    		this.$element.remove();
    	}
	};

	// 3. IMPLEMENTACJA KLASY CARD

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard(); //

		function createCard() {
		
		// tworzenie elementów, z których będzie składała się karta

			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete btn-delete-task').html('<i class="fa fa-trash-o"></i>');			
			

		// Podpinanie zdarzeń

			$cardDelete.click(function(){
			        self.removeCard();
			});
			
		//Konstruowanie karty

			$card.append($cardDelete)
			.append($cardDescription);
		
		// Return of created cards
			return $card;

		}//koniec funkcji createCard

  	}//koniec funkcji Card

  	//METODA DLA KLASY CARD //Metoda usuwająca kartę

  	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

  	// 4. OBIEKT TABLICY

  	/*uznaliśmy, że nie ma sensu tworzenie klasy dla tablicy, 
  	gdyż na naszej stronie będzie tylko jeden taki element.
	Stworzyliśmy już nawet w pliku index.html jego podstawową strukturę. 
	
	Musimy jednak stworzyć obiekt tablicy w JavaScripcie i przypiąć odpowiednie 
	nasłuchiwania zdarzeń.*/

	var board = {
  		name: 'Kanban Board',
    	addColumn: function(column) {
    		this.$element.append(column.$element);
    		initSortable();
    		initSortableColumn();
    	},
    	$element: $('#board .column-container')
	};

	/*Nie ma potrzeby tworzenia żadnego prototypu, bo nie ma klasy. 
	Metoda, której będziemy używali do tworzenia nowej kolumny, 
	jest podpięta bezpośrednio do obiektu board.*/


	// Funkcja: initSortable() 

	//W tym celu dodaliśmy sobie rozszerzenie jQueryUI. 
	//Dzięki niemu możemy korzystać z opcji drag'n'drop, 
	//która pozwala nam przenosić elementy na stronie. 
	//Dodatkowo biblioteka udostępnia metodę sortable, 
	//dzięki której możemy sortować elementy listy za pomocą metody przeciągnij i upuść.

	function initSortable() {
   		$('.column-card-list').sortable({
     		connectWith: '.column-card-list',
     		placeholder: 'card-placeholder'
   		}).disableSelection();//=>wyłączenie możliwości zaznaczania tekstu na kartach, które przeciągamy. 
   		//Nie chcemy, aby omyłkowo podczas przeciągania, zaznaczał nam się tekst. 
 	}

 	function initSortableColumn() {
   		$('.column-container').sortable({
     		connectWith: '.column-container',
     		placeholder: 'column-placeholder'
   		}).disableSelection();//=>wyłączenie możliwości zaznaczania tekstu na kartach, które przeciągamy. 
   		//Nie chcemy, aby omyłkowo podczas przeciągania, zaznaczał nam się tekst. 
 	}

	// Podpięcie przycisku do dodawania kolejnych kolumn do zdarzenia
	$('.create-column').click(function(){
			var name = prompt('Enter a column name');
			var column = new Column(name);
	    	board.addColumn(column);
	});

// 5. TWORZENIE KOLUMN
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// 6. DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// 7. TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// 8. DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	

})//koniec funkcji document.ready

