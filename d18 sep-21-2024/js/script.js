const tabHeaders = document.querySelectorAll('.tab-headers')[0];
const childrenTabHeaders = tabHeaders.children;
const headersArr = Array.from(childrenTabHeaders);

const tabDetails = document.querySelectorAll('.tab-details')[0];
const childrenTabDetails = tabDetails.children;
const detailsArr = Array.from(childrenTabDetails);

headersArr.forEach((header, index) => {
  header.addEventListener('click', () => {
    headersArr.forEach((header) => {
      header.classList.remove('active');
    });
    header.classList.add('active');

    detailsArr.forEach((detail) => {
      detail.classList.remove('active');
    });
    detailsArr[index].classList.add('active');
  });
});