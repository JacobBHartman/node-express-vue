$(document).ready(function(){
    $('.deletePerson').on('click', deletePerson);
});

function deletePerson(){
    var confirmation = confirm('Are you sure?');

    if(confirmation){
        $.ajax({
            type:'DELETE',
            url:'/people/delete/'+$(this).data('id')
        }).done(function(response){
            window.location.replace('/');
        });
        window.location.replace('/');
    } else {
        return false;
    }
}