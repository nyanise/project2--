//POST

$(function() {
    // GET-READ
    let userIds =1; 
    let categoryIds=1;
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/posts',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="title" value="' + product.title + '"></td>\
                            <td><input type="text" class="body" value="' + product.body + '"></td>\
                            <td>\
                                <button class="update-button btn btn-primary btn-sm"><i class="far fa-edit"></i></button>\
                                <button class="delete-button btn btn-secondary btn-sm"><i class="fas fa-eraser"></i></i></button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE-POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var Input1 = $('#input1');
        var Input2 = $('#input2');
        
        $.ajax({
            url: 'http://localhost:3000/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            title: Input1.val(),
            body: Input2.val(),userId: userIds,
            categoryId: categoryIds}),
            success: function(response) {
                console.log(response);

                Input1.val('');
                Input2.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE-PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newTitle = rowEl.find('.title').val();
        var newBody = rowEl.find('.body').val();
        console.log(newTitle); 
        console.log(newBody); 

        $.ajax({
            url: 'http://localhost:3000/posts/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ title: newTitle, body: newBody, id: id  }),
            success: function(response) {
                
                $('#get-button').click();
            }
        });
    });

     // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/posts/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response[0]);
                $('#get-button').click();
            
            }
        });
    });
    $('#get-button').click();

})

