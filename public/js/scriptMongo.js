const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.description+'</p>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postDoggo(formData);
}

function postDoggo(dog){
    $.ajax({
        url:'/api/doggo',
        type:'POST',
        data:dog,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Doggo adoption successful');
            }
        }
    });
}

function getAllDoggos(){
    $.get('/api/doggos', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllDoggos();
});

function handleDeleteCollection() {
    fetch('/delete-collection', {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('All items in the collection deleted successfully');
        // Perform actions after successful deletion if needed
      } else {
        console.error('Failed to delete items in the collection');
        // Handle errors if deletion fails
      }
    })
    .catch(error => {
      console.error('Error occurred during collection item deletion', error);
      // Handle other errors during deletion
    });
  }
  
  document.getElementById("deleteCollectionButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default button behavior
    handleDeleteCollection(); // Call the function to handle delete operation
  });

