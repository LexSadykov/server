import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/messages/unread';

const messagesContainer = document.getElementById('messages');

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const formatSubject = (subject) => (subject.length > 15 ? `${subject.slice(0, 15)}...` : subject);

interval(5000)
  .pipe(
    map(() => ajax.getJSON(API_URL)),
    catchError(() => []),
  )
  .subscribe((response) => {
    if (response.messages) {
      response.messages.forEach((msg) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${msg.from}</td>
          <td>${formatSubject(msg.subject)}</td>
          <td>${formatTime(msg.received)}</td>
        `;
        messagesContainer.prepend(row);
      });
    }
  });
