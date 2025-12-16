using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CalendarioEventos.Models;
using CalendarioEventos.Services;

namespace CalendarioEventos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventService _service;

        public EventosController(IEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? tipo, [FromQuery] string? search)
        {
            var list = await _service.GetAllAsync(tipo, search);
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var ev = await _service.GetByIdAsync(id);
            if (ev == null) return NotFound();
            return Ok(ev);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Evento ev)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);
            var created = await _service.CreateAsync(ev);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Evento ev)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);
            if (id != ev.Id) return BadRequest("Id mismatch");
            var ok = await _service.UpdateAsync(ev);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}