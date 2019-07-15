# Database Queries

## Find all customers with postal code 1010.
SELECT * FROM Customers
WHERE PostalCode = 1010

## Find the phone number for the supplier with the id 11.
SELECT phone FROM Suppliers 
WHERE SupplierID = 11

## List first 10 orders ever places, descending by the order date.
SELECT  * FROM Orders
ORDER BY OrderDate DESC
LIMIT 10

## Find all customers that live in London, Madrid, or Brazil. 

## Add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _ -"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) 
VALUES ('The shire', 'Bilbo Baggins', 'Bag End', '1 Hobbit-Hole', '111', 'Middle Earth')

## Update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted. 

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name.



