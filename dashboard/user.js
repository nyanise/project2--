//USER

$(function() {
    // GET-READ
    let userId =1; 
    let categoryId=1;
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost:3000/users',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(el) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="name" value="' + el.name + '"></td>\
                            <td><input type="text" class="email" value="' + el.email + '"></td>\
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
            url: 'http://localhost:3000/users',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            name: Input1.val(),
            email: Input2.val()}),
            success: function(response) {
                console.log(response);

                Input1.val('');
                Input2.val('');
                $('#get-button').click();
            }
        });
    });

      // UPDATE/PUT
      $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newTitle = rowEl.find('.name').val();
        var newBody = rowEl.find('.email').val();
        console.log(newTitle); 
        console.log(newBody); 

        $.ajax({
            url:   'http://localhost:3000/users/'+ id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: newTitle, email: newBody  }),
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
            url: 'http://localhost:3000/users/'+ id,
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

