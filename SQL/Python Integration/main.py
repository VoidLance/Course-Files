import sqlite3

def connect_to_db(db_name):
    conn = sqlite3.connect(db_name)
    return conn

conn = connect_to_db('sales_data.db')
cur = conn.cursor()

def create_sale(product_name,quantity,sale_date,amount):
    try:
        sql = "INSERT INTO sales(product_name, quantity, sale_date, amount) VALUES(?,?,?,?)"
        cur.execute(sql, (product_name, quantity, sale_date, amount))
        conn.commit()
        print("Sale record created successfully")
    except Exception as e:
        print(f"Error creating sale record: {e}")
        conn.rollback()

create_sale('Product1', 100, '2023-01-01', 999.99)

def read_sales ():
    try:
        sql = "SELECT * FROM sales"
        cur.execute(sql)
        rows = cur.fetchall()
        for row in rows:
            print(f"id: {row[0]}, Product: {row[1]}, Quantity: {row[2]}, Date: {row[3]} Amount: {row[4]}")
    except Exeption as e:
        print(f"Error reading sales records: {e}")

read_sales()

def update_sale(sale_id, product_name, quantity, sale_date, amount):
    try:
        sql = "UPDATE sales SET product_name = ?, quantity = ?, sale_date = ?, amount = ? WHERE sale_id = ?"
        cur.execute(sql, (product_name, quantity, sale_date, amount, sale_id))
        conn.commit()
        print("Sale record updated successfully")
    except Exception as e:
        print(f"Error updating sale record: {e}")
        conn.rollback()

update_sale(1, 'Product1_updated', 150, '2023-01-02', 1200.99)

def delete_sale (sale_id):
    try:
        sql = "DELETE FROM sales WHERE sale_id = ?"
        cur.execute(sql, (sale_id))
        conn.commit()
        print("Sale record deleted successfully")
    except Exception as e:
        print(f"Error deleting sale record: {e}")
        conn.rollback()

delete_sale(1)