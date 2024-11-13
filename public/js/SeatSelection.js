document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('click', () => {
      if (seat.classList.contains('booked')) return;
  
      seat.classList.toggle('selected');
      seat.classList.toggle('bg-green-500');
    });
  });
  