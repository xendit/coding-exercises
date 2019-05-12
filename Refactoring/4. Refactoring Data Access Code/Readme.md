# [WIP] Refactoring Data Access Code

Data access code is hard to work with because it has a lot of complexities it is managing. There are many responsibilities for you to be aware of when working with this kind of code:

1. Connection and session management with databases (they typically are not in the same memory as the application process)
2. Implicit logic captured in the model schema, including validation
3. Logic to transform incoming before it's sent to the database or transform retrieved data from the database before it's delivered to the caller
4. Dealing with changing state in the database over time

Complexity at this level comes from not clearly separating responsibilities. However, since data is the lowest layer of the typical application stack, it's of the **upmost importance** that the data layer is solid or else the entire application will crumble. In the following exercise, we will see a data layer that has a mix of all of the responsibilities above and learn how we can work to untangle this kind of logic.