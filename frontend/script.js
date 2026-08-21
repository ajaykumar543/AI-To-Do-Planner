const STORAGE_KEY = 'ai-todo-planner-tasks-v1';
let tasks = loadTasks();
let activeToast;
const $ = id => document.getElementById(id);

function loadTasks() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(saved) ? saved : []; } catch { return []; } }
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function escapeHtml(value) { const el = document.createElement('div'); el.textContent = String(value ?? ''); return el.innerHTML; }
function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(date) { return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T00:00:00`)); }
function dueInfo(task) { if (task.completed) return ''; if (task.dueDate < today()) return '<span class="pill overdue">Overdue</span>'; if (task.dueDate === today()) return '<span class="pill today">Due today</span>'; return ''; }
function priorityRank(priority) { return { High: 0, Medium: 1, Low: 2 }[priority] ?? 3; }

function render() {
  const total = tasks.length, completed = tasks.filter(t => t.completed).length, progress = total ? Math.round(completed / total * 100) : 0;
  $('totalCount').textContent = total; $('completedCount').textContent = completed; $('pendingCount').textContent = total - completed; $('progressCount').textContent = `${progress}%`; $('progressBar').style.width = `${progress}%`;
  const query = $('searchInput').value.trim().toLowerCase(), filter = $('filterSelect').value, sort = $('sortSelect').value;
  const shown = tasks.filter(task => {
    const matchesSearch = !query || `${task.title} ${task.description}`.toLowerCase().includes(query);
    const matchesFilter = filter === 'all' || (filter === 'pending' && !task.completed) || (filter === 'completed' && task.completed) || task.priority.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => sort === 'priority' ? priorityRank(a.priority) - priorityRank(b.priority) : sort === 'created' ? b.createdAt.localeCompare(a.createdAt) : a.dueDate.localeCompare(b.dueDate));
  $('taskList').innerHTML = shown.map(task => `<article class="task ${task.completed ? 'done' : ''}"><input class="check" type="checkbox" aria-label="Mark ${escapeHtml(task.title)} complete" data-complete="${task.id}" ${task.completed ? 'checked' : ''}><div class="task-main"><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.description)}</p><div class="metadata"><span class="pill ${task.priority.toLowerCase()}">${task.priority}</span><span class="pill">◷ ${escapeHtml(task.estimatedTime)}</span><span class="pill">▣ ${formatDate(task.dueDate)}</span>${dueInfo(task)}</div></div><div class="task-actions"><button class="icon-button" data-edit="${task.id}" aria-label="Edit task">Edit</button><button class="icon-button delete" data-delete="${task.id}" aria-label="Delete task">Delete</button></div></article>`).join('');
  $('emptyState').hidden = shown.length > 0;
  $('taskList').hidden = shown.length === 0;
}
function showToast(message) { const toast = $('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(activeToast); activeToast = setTimeout(() => toast.classList.remove('show'), 3200); }
function setBusy(isBusy) { $('generateBtn').disabled = isBusy; $('loading').hidden = !isBusy; }
function openModal(task) { $('taskForm').reset(); $('modalTitle').textContent = task ? 'Edit task' : 'Add task'; $('taskId').value = task?.id || ''; $('taskTitle').value = task?.title || ''; $('taskDescription').value = task?.description || ''; $('taskPriority').value = task?.priority || 'Medium'; $('taskTime').value = task?.estimatedTime || ''; $('taskDueDate').value = task?.dueDate || $('deadline').value || today(); $('modal').hidden = false; $('taskTitle').focus(); }
function closeModal() { $('modal').hidden = true; $('taskForm').reset(); }

$('goalForm').addEventListener('submit', async event => {
  event.preventDefault(); $('formMessage').textContent = '';
  const goal = $('goal').value.trim(), deadline = $('deadline').value;
  if (!goal) return $('formMessage').textContent = 'Please describe what you want to accomplish.';
  if (!deadline || deadline < today()) return $('formMessage').textContent = 'Choose a deadline that is today or later.';
  setBusy(true);
  try {
    const response = await fetch('/api/ai/plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goal, deadline, priority: $('priority').value, preferences: { timePerDay: $('timePerDay').value.trim(), difficulty: $('difficulty').value, schedule: $('schedule').value.trim() } }) });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.tasks || !Array.isArray(payload.tasks)) throw new Error(payload?.error || 'Unable to generate your plan right now. Please try again.');
    const createdAt = new Date().toISOString();
    const newTasks = payload.tasks.filter(validAiTask).map(task => ({ ...task, id: crypto.randomUUID(), completed: false, createdAt }));
    if (!newTasks.length) throw new Error('The AI response could not be used. Please try again.');
    tasks = [...newTasks, ...tasks]; saveTasks(); render(); $('goalForm').reset(); $('deadline').min = today(); showToast(`${newTasks.length} tasks added to your plan.`); $('tasks').scrollIntoView({ behavior: 'smooth' });
  } catch (error) { $('formMessage').textContent = error.message || 'Unable to generate your plan right now. Please try again.'; }
  finally { setBusy(false); }
});
function validAiTask(task) { return task && typeof task.title === 'string' && typeof task.description === 'string' && ['Low', 'Medium', 'High'].includes(task.priority) && typeof task.estimatedTime === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate); }

$('taskList').addEventListener('click', event => { const id = event.target.dataset.edit || event.target.dataset.delete; if (!id) return; if (event.target.dataset.edit) openModal(tasks.find(t => t.id === id)); if (event.target.dataset.delete) { tasks = tasks.filter(t => t.id !== id); saveTasks(); render(); showToast('Task deleted.'); } });
$('taskList').addEventListener('change', event => { const id = event.target.dataset.complete; if (!id) return; const task = tasks.find(t => t.id === id); task.completed = event.target.checked; saveTasks(); render(); showToast(task.completed ? 'Task completed.' : 'Task reopened.'); });
$('taskForm').addEventListener('submit', event => { event.preventDefault(); const id = $('taskId').value, data = { title: $('taskTitle').value.trim(), description: $('taskDescription').value.trim(), priority: $('taskPriority').value, estimatedTime: $('taskTime').value.trim(), dueDate: $('taskDueDate').value }; if (!data.title || !data.description || !data.estimatedTime || !data.dueDate) return; if (id) { const index = tasks.findIndex(t => t.id === id); tasks[index] = { ...tasks[index], ...data }; } else tasks.unshift({ ...data, id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString() }); saveTasks(); render(); closeModal(); showToast(id ? 'Task updated.' : 'Task added.'); });
['searchInput', 'filterSelect', 'sortSelect'].forEach(id => $(id).addEventListener(id === 'searchInput' ? 'input' : 'change', render));
$('addTaskBtn').addEventListener('click', () => openModal()); $('emptyAddBtn').addEventListener('click', () => openModal()); $('closeModal').addEventListener('click', closeModal); $('modal').addEventListener('click', event => { if (event.target === $('modal')) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('modal').hidden) closeModal(); });
$('clearCompleted').addEventListener('click', () => { const count = tasks.filter(t => t.completed).length; if (!count) return showToast('There are no completed tasks to clear.'); tasks = tasks.filter(t => !t.completed); saveTasks(); render(); showToast(`${count} completed task${count === 1 ? '' : 's'} cleared.`); });
$('deadline').min = today(); render();
