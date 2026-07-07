import sqlite3

def connect_to_db(db_name):
    return sqlite3.connect(db_name)

conn = connect_to_db('final_project.db')
cur = conn.cursor()


# -------------------------
# Customers CRUD
# -------------------------
def create_customer(first_name, last_name, email):
    cur.execute(
        "INSERT INTO Customers (firstName, lastName, email) VALUES (?, ?, ?)",
        (first_name, last_name, email)
    )
    conn.commit()
    return cur.lastrowid


def get_customer(customer_id):
    cur.execute(
        "SELECT customerID, firstName, lastName, email FROM Customers WHERE customerID = ?",
        (customer_id,)
    )
    return cur.fetchone()


def get_all_customers():
    cur.execute("SELECT customerID, firstName, lastName, email FROM Customers")
    return cur.fetchall()


def update_customer(customer_id, first_name, last_name, email):
    cur.execute(
        """
        UPDATE Customers
        SET firstName = ?, lastName = ?, email = ?
        WHERE customerID = ?
        """,
        (first_name, last_name, email, customer_id)
    )
    conn.commit()
    return cur.rowcount


def delete_customer(customer_id):
    cur.execute("DELETE FROM Customers WHERE customerID = ?", (customer_id,))
    conn.commit()
    return cur.rowcount


# -------------------------
# Products CRUD
# -------------------------
def create_product(product_name, price, stock):
    cur.execute(
        "INSERT INTO Products (productName, price, stock) VALUES (?, ?, ?)",
        (product_name, price, stock)
    )
    conn.commit()
    return cur.lastrowid


def get_product(product_id):
    cur.execute(
        "SELECT productID, productName, price, stock FROM Products WHERE productID = ?",
        (product_id,)
    )
    return cur.fetchone()


def get_all_products():
    cur.execute("SELECT productID, productName, price, stock FROM Products")
    return cur.fetchall()


def update_product(product_id, product_name, price, stock):
    cur.execute(
        """
        UPDATE Products
        SET productName = ?, price = ?, stock = ?
        WHERE productID = ?
        """,
        (product_name, price, stock, product_id)
    )
    conn.commit()
    return cur.rowcount


def delete_product(product_id):
    cur.execute("DELETE FROM Products WHERE productID = ?", (product_id,))
    conn.commit()
    return cur.rowcount


# -------------------------
# Orders CRUD
# -------------------------
def create_order(customer_id, product_id, quantity):
    cur.execute("SELECT price, stock FROM Products WHERE productID = ?", (product_id,))
    product = cur.fetchone()

    if product is None:
        raise ValueError("Product not found.")

    price, stock = product
    if stock is not None and quantity > stock:
        raise ValueError("Insufficient stock for this order.")

    value = float(price) * int(quantity)

    cur.execute(
        "INSERT INTO Orders (customerID, productID, quantity, value) VALUES (?, ?, ?, ?)",
        (customer_id, product_id, quantity, value)
    )

    # Keep stock consistent with successful order creation.
    if stock is not None:
        cur.execute(
            "UPDATE Products SET stock = stock - ? WHERE productID = ?",
            (quantity, product_id)
        )

    conn.commit()
    return cur.lastrowid


def get_order(order_id):
    cur.execute(
        "SELECT orderID, customerID, productID, quantity, value FROM Orders WHERE orderID = ?",
        (order_id,)
    )
    return cur.fetchone()


def get_all_orders():
    cur.execute("SELECT orderID, customerID, productID, quantity, value FROM Orders")
    return cur.fetchall()


def update_order(order_id, customer_id, product_id, quantity):
    cur.execute("SELECT price FROM Products WHERE productID = ?", (product_id,))
    product = cur.fetchone()

    if product is None:
        raise ValueError("Product not found.")

    value = float(product[0]) * int(quantity)

    cur.execute(
        """
        UPDATE Orders
        SET customerID = ?, productID = ?, quantity = ?, value = ?
        WHERE orderID = ?
        """,
        (customer_id, product_id, quantity, value, order_id)
    )
    conn.commit()
    return cur.rowcount


def delete_order(order_id):
    cur.execute("DELETE FROM Orders WHERE orderID = ?", (order_id,))
    conn.commit()
    return cur.rowcount


# -------------------------
# Feedback CRUD
# -------------------------
def create_feedback(customer_id, order_id, feedback_text, rating):
    cur.execute(
        """
        INSERT INTO Feedback (customerID, orderID, feedbackText, rating)
        VALUES (?, ?, ?, ?)
        """,
        (customer_id, order_id, feedback_text, rating)
    )
    conn.commit()
    return cur.lastrowid


def get_feedback(feedback_id):
    cur.execute(
        "SELECT feedbackID, customerID, orderID, feedbackText, rating FROM Feedback WHERE feedbackID = ?",
        (feedback_id,)
    )
    return cur.fetchone()


def get_all_feedback():
    cur.execute("SELECT feedbackID, customerID, orderID, feedbackText, rating FROM Feedback")
    return cur.fetchall()


def update_feedback(feedback_id, feedback_text, rating):
    cur.execute(
        """
        UPDATE Feedback
        SET feedbackText = ?, rating = ?
        WHERE feedbackID = ?
        """,
        (feedback_text, rating, feedback_id)
    )
    conn.commit()
    return cur.rowcount


def delete_feedback(feedback_id):
    cur.execute("DELETE FROM Feedback WHERE feedbackID = ?", (feedback_id,))
    conn.commit()
    return cur.rowcount


# -------------------------
# Reporting Queries
# -------------------------
def report_customer_orders():
    cur.execute(
        """
        SELECT
            c.customerID,
            c.firstName,
            c.lastName,
            COUNT(o.orderID) AS totalOrders,
            COALESCE(SUM(o.value), 0) AS totalSpent
        FROM Customers c
        LEFT JOIN Orders o ON c.customerID = o.customerID
        GROUP BY c.customerID, c.firstName, c.lastName
        ORDER BY totalSpent DESC
        """
    )
    return cur.fetchall()


def report_product_sales():
    cur.execute(
        """
        SELECT
            p.productID,
            p.productName,
            COALESCE(SUM(o.quantity), 0) AS unitsSold,
            COALESCE(SUM(o.value), 0) AS salesValue
        FROM Products p
        LEFT JOIN Orders o ON p.productID = o.productID
        GROUP BY p.productID, p.productName
        ORDER BY unitsSold DESC, salesValue DESC
        """
    )
    return cur.fetchall()


def report_feedback_analytics():
    cur.execute(
        """
        SELECT
            COUNT(*) AS feedbackCount,
            ROUND(AVG(rating), 2) AS averageRating,
            MIN(rating) AS lowestRating,
            MAX(rating) AS highestRating
        FROM Feedback
        """
    )
    summary = cur.fetchone()

    cur.execute(
        """
        SELECT
            rating,
            COUNT(*) AS ratingCount
        FROM Feedback
        GROUP BY rating
        ORDER BY rating DESC
        """
    )
    distribution = cur.fetchall()

    return {
        "summary": summary,
        "distribution": distribution
    }


def close_connection():
    conn.close()


def read_int(prompt):
    return int(input(prompt).strip())


def read_float(prompt):
    return float(input(prompt).strip())


def print_rows(rows):
    if not rows:
        print("No records found.")
        return
    for row in rows:
        print(row)


def print_menu():
    print("\nCRM MENU")
    print("1. Create customer")
    print("2. List customers")
    print("3. Update customer")
    print("4. Delete customer")
    print("5. Create product")
    print("6. List products")
    print("7. Update product")
    print("8. Delete product")
    print("9. Create order (auto-calculates value)")
    print("10. List orders")
    print("11. Update order (auto-recalculates value)")
    print("12. Delete order")
    print("13. Create feedback")
    print("14. List feedback")
    print("15. Update feedback")
    print("16. Delete feedback")
    print("17. Customer orders report")
    print("18. Product sales report")
    print("19. Feedback analytics report")
    print("0. Exit")


def run_cli():
    while True:
        print_menu()
        choice = input("Choose an option: ").strip()

        try:
            if choice == "1":
                customer_id = create_customer(
                    input("First name: ").strip(),
                    input("Last name: ").strip(),
                    input("Email: ").strip()
                )
                print(f"Customer created with ID: {customer_id}")

            elif choice == "2":
                print_rows(get_all_customers())

            elif choice == "3":
                affected = update_customer(
                    read_int("Customer ID: "),
                    input("New first name: ").strip(),
                    input("New last name: ").strip(),
                    input("New email: ").strip()
                )
                print(f"Updated rows: {affected}")

            elif choice == "4":
                affected = delete_customer(read_int("Customer ID: "))
                print(f"Deleted rows: {affected}")

            elif choice == "5":
                product_id = create_product(
                    input("Product name: ").strip(),
                    read_float("Price: "),
                    read_int("Stock: ")
                )
                print(f"Product created with ID: {product_id}")

            elif choice == "6":
                print_rows(get_all_products())

            elif choice == "7":
                affected = update_product(
                    read_int("Product ID: "),
                    input("New product name: ").strip(),
                    read_float("New price: "),
                    read_int("New stock: ")
                )
                print(f"Updated rows: {affected}")

            elif choice == "8":
                affected = delete_product(read_int("Product ID: "))
                print(f"Deleted rows: {affected}")

            elif choice == "9":
                order_id = create_order(
                    read_int("Customer ID: "),
                    read_int("Product ID: "),
                    read_int("Quantity: ")
                )
                print(f"Order created with ID: {order_id}")

            elif choice == "10":
                print_rows(get_all_orders())

            elif choice == "11":
                affected = update_order(
                    read_int("Order ID: "),
                    read_int("Customer ID: "),
                    read_int("Product ID: "),
                    read_int("Quantity: ")
                )
                print(f"Updated rows: {affected}")

            elif choice == "12":
                affected = delete_order(read_int("Order ID: "))
                print(f"Deleted rows: {affected}")

            elif choice == "13":
                feedback_id = create_feedback(
                    read_int("Customer ID: "),
                    read_int("Order ID: "),
                    input("Feedback text: ").strip(),
                    read_float("Rating (1-5): ")
                )
                print(f"Feedback created with ID: {feedback_id}")

            elif choice == "14":
                print_rows(get_all_feedback())

            elif choice == "15":
                affected = update_feedback(
                    read_int("Feedback ID: "),
                    input("New feedback text: ").strip(),
                    read_float("New rating (1-5): ")
                )
                print(f"Updated rows: {affected}")

            elif choice == "16":
                affected = delete_feedback(read_int("Feedback ID: "))
                print(f"Deleted rows: {affected}")

            elif choice == "17":
                print_rows(report_customer_orders())

            elif choice == "18":
                print_rows(report_product_sales())

            elif choice == "19":
                analytics = report_feedback_analytics()
                print("Summary:")
                print(analytics["summary"])
                print("Distribution:")
                print_rows(analytics["distribution"])

            elif choice == "0":
                print("Exiting CRM menu.")
                break

            else:
                print("Invalid option. Please choose a valid menu number.")

        except ValueError as exc:
            print(f"Input or business-rule error: {exc}")
        except sqlite3.IntegrityError as exc:
            print(f"Database integrity error: {exc}")
        except sqlite3.Error as exc:
            print(f"Database error: {exc}")


if __name__ == "__main__":
    try:
        run_cli()
    finally:
        close_connection()

