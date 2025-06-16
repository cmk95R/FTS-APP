// --- Elementos DOM ---
const fileTableBody = document.getElementById('fileTableBody');
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');

const downloadModalOverlay = document.getElementById('downloadModalOverlay');
const downloadFileNameElem = document.getElementById('downloadFileName');
const downloadConfirmBtn = document.getElementById('downloadConfirmBtn');
const downloadCancelBtn = document.getElementById('downloadCancelBtn');

const deleteModalOverlay = document.getElementById('deleteModalOverlay');
const deleteFileNameElem = document.getElementById('deleteFileName');
const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
const deleteCancelBtn = document.getElementById('deleteCancelBtn');

const toastContainer = document.getElementById('toastContainer');

const selectedFileName = document.getElementById('selectedFileName');
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      selectedFileName.textContent = `Archivo seleccionado: ${fileInput.files[0].name}`;
    } else {
      selectedFileName.textContent = '';
    }
  });

// --- Función para mostrar toast ---
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, duration);
}
// --- Modal Renombrar ---
const renameModalOverlay = document.getElementById('renameModalOverlay');
const renameFileOldNameElem = document.getElementById('renameFileOldName');
const renameInput = document.getElementById('renameInput');
const renameConfirmBtn = document.getElementById('renameConfirmBtn');
const renameCancelBtn = document.getElementById('renameCancelBtn');

function openRenameModal(oldName) {
  renameFileOldNameElem.textContent = oldName;
  renameInput.value = oldName;
  renameModalOverlay.style.display = 'flex';
  renameInput.focus();

  return new Promise((resolve) => {
    function confirmHandler() {
      const newName = renameInput.value.trim();
      if (!newName) {
        showToast('El nombre no puede estar vacío.', 'error');
        return;
      }
      cleanup();
      resolve(newName);
    }
    function cancelHandler() {
      cleanup();
      resolve(null);
    }
    function cleanup() {
      renameConfirmBtn.removeEventListener('click', confirmHandler);
      renameCancelBtn.removeEventListener('click', cancelHandler);
      renameModalOverlay.style.display = 'none';
    }
    renameConfirmBtn.addEventListener('click', confirmHandler);
    renameCancelBtn.addEventListener('click', cancelHandler);
  });
}

// --- Modal Descarga ---
function openDownloadModal(filename) {
  downloadFileNameElem.textContent = filename;
  downloadModalOverlay.style.display = 'flex';

  return new Promise((resolve) => {
    function confirmHandler() {
      cleanup();
      resolve(true);
    }
    function cancelHandler() {
      cleanup();
      resolve(false);
    }
    function cleanup() {
      downloadConfirmBtn.removeEventListener('click', confirmHandler);
      downloadCancelBtn.removeEventListener('click', cancelHandler);
      downloadModalOverlay.style.display = 'none';
    }
    downloadConfirmBtn.addEventListener('click', confirmHandler);
    downloadCancelBtn.addEventListener('click', cancelHandler);
  });
}

// --- Modal Eliminación ---
function openDeleteModal(filename) {
  deleteFileNameElem.textContent = filename;
  deleteModalOverlay.style.display = 'flex';

  return new Promise((resolve) => {
    function confirmHandler() {
      cleanup();
      resolve(true);
    }
    function cancelHandler() {
      cleanup();
      resolve(false);
    }
    function cleanup() {
      deleteConfirmBtn.removeEventListener('click', confirmHandler);
      deleteCancelBtn.removeEventListener('click', cancelHandler);
      deleteModalOverlay.style.display = 'none';
    }
    deleteConfirmBtn.addEventListener('click', confirmHandler);
    deleteCancelBtn.addEventListener('click', cancelHandler);
  });
}

// --- Cargar archivos ---
// --- Cargar archivos ---
async function loadFiles() {
  fileTableBody.innerHTML = '';
  try {
    const res = await fetch('/api/files?ts=' + Date.now());
    const data = await res.json();

    if (data.files && data.files.length === 0) {
      fileTableBody.innerHTML = '<tr><td colspan="2">No hay archivos en el servidor</td></tr>';
    } else if (data.files) {
      data.files.forEach(name => addFileRow(name));
    } else {
      fileTableBody.innerHTML = '<tr><td colspan="2">Respuesta inesperada del servidor</td></tr>';
      console.error('Respuesta inesperada del servidor:', data);
    }
  } catch (e) {
    console.error('Error al cargar archivos:', e);
    fileTableBody.innerHTML = '<tr><td colspan="2">Error al cargar archivos. Intente de nuevo.</td></tr>';
    showToast('Error al cargar archivos. Verifique la consola para más detalles.', 'error');
  }
}

// --- Agregar fila de archivo ---
function addFileRow(filename) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${filename}</td>
    <td>
      <button onclick="downloadFile('${filename}')" class="btn-primary">Descargar</button>
      <button onclick="renameFile('${filename}')" class="btn-secondary">Renombrar</button>
      <button onclick="deleteFile('${filename}')" class="btn-danger">Eliminar</button>
    </td>
  `;
  fileTableBody.appendChild(tr);
}

// --- Subir archivo ---
// --- Subir archivo ---
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (fileInput.files.length === 0) {
    showToast('Por favor, seleccione un archivo para subir.', 'info');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    const res = await fetch('/api/files', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Error del servidor: ${res.status}`);
    }

    fileInput.value = '';
    setTimeout(() => {
      loadFiles();
      showToast('Archivo subido exitosamente.', 'success');
    }, 300);

  } catch (err) {
    console.error('Error al subir el archivo:', err);
    showToast(`Error al subir el archivo: ${err.message}`, 'error');
  }
});

// --- Descargar archivo con confirmación ---
async function downloadFile(name) {
  const confirmed = await openDownloadModal(name);
  if (confirmed) {
    window.open(`/api/files/${name}`, '_blank');
    showToast(`Descargando "${name}"...`, 'success');
  } else {
    showToast('Descarga cancelada.', 'info');
  }
}

// --- Eliminar archivo con confirmación ---
async function deleteFile(name) {
  const confirmed = await openDeleteModal(name);
  if (!confirmed) {
    showToast('Eliminación cancelada.', 'info');
    return;
  }
  try {
    const res = await fetch(`/api/files/${name}`, { method: 'DELETE' });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Error del servidor: ${res.status}`);
    }
    await loadFiles();
    showToast(`Archivo "${name}" eliminado exitosamente.`, 'success');
  } catch (err) {
    console.error('Error al eliminar el archivo:', err);
    showToast(`Error al eliminar el archivo: ${err.message}`, 'error');
  }
}

// --- Renombrar archivo (sin cambios) ---
async function renameFile(oldName) {
  const newName = await openRenameModal(oldName);

  if (newName === null) {
    showToast('Renombrado cancelado.', 'info');
    return;
  }

  if (newName === oldName) {
    showToast('El nuevo nombre es igual al anterior. No se realizaron cambios.', 'info');
    return;
  }

  try {
    const res = await fetch(`/api/files/${oldName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newName })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Error del servidor: ${res.status}`);
    }

    await loadFiles();
    showToast(`Archivo renombrado a "${newName}"`, 'success');
  } catch (err) {
    console.error('Error al renombrar el archivo:', err);
    showToast(`Error al renombrar: ${err.message}`, 'error');
  }
}

// --- Ejecutar carga inicial ---
loadFiles();

// Exportar funciones para acceso global en HTML inline onclick
window.downloadFile = downloadFile;
window.deleteFile = deleteFile;
window.renameFile = renameFile;
