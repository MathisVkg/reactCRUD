using Microsoft.AspNetCore.Mvc;
using WebAPIReactCrud.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MediatR;
using WebAPIReactCrud.Common.Mappings;

namespace WebAPIReactCrud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryDatabaseController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoryDatabaseController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCategory")]
        public IActionResult GetCategory()
        {
            List<Category> categories = _context.Categories.ToList();
            return Ok(categories);
        }

        [HttpPost(Name = "PostCategory")]
        public async Task<ActionResult<CategoryDto>> PostProduction(CategoryDto catedto)
        {
            var category = new Category
            {
                Name = catedto.Name
            };
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCategory", category);
        }
        
        [HttpDelete(Name = "DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
    
    public class CategoryDto: IMapFrom<Category>
    {
        public string Name { get; set; }
    }
}

