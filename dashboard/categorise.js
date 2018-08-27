$(function() {
    // GET-READ
    
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/categories',
            contentType: 'application/json',
            success: function(response) {
                var tbody = $('tbody');

                tbody.html('');

                response.forEach(function(el) {
                    tbody.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="name" value="' + el.name + '"></td>\
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
        
        $.ajax({
            url: 'http://localhost:3000/categories',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            name: Input1.val()}),
            success: function(response) {
                console.log(response);

                Input1.val('');
                $('#get-button').click();
            }
        });
    });

  
    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: 'http://localhost:3000/categories/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
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
            url: 'http://localhost:3000/categories/'+ id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response[0]);
                $('#get-button').click();
            }
        });
    });
    $('#get-button').click();
    $('#get-button').click();
})






