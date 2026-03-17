def tri_recursion(k):
    if k>0:
        result = k
        tri_recursion(k-1)
        print(result)
        return None
    else:
        result = 0
        return result

print("\n\nRecursion Example Results")

tri_recursion(6)