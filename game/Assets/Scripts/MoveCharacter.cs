using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveCharacter : MonoBehaviour
{

    private float velocity;
    private Vector2 characterDirection;
    private Vector2 direction;
    private Rigidbody2D characterRigidBody;

    private SpriteRenderer characterRenderer;
    private bool toggleColor = false;

    [SerializeField]
    private bool criticDamage = false;

    public Animator anim;

    // Start is called before the first frame update
    void Start()
    {
        velocity = 3;
        direction = Vector2.zero;
        characterRigidBody = GetComponent<Rigidbody2D>();
        characterRenderer = GetComponent<SpriteRenderer>();
    }

    // Update is called once per frame
    void Update()
    {
        CharacterInput();
        // transform.Translate(direction * velocity * Time.deltaTime);

        if (direction.x != 0 || direction.y != 0)
        {
            Animation(direction);
        }
        else
        {
            anim.SetLayerWeight(1, 0);
        }

        if (toggleColor)
        {
            PingPongColor(8);
        }

        if (criticDamage)
        {
            PingPongColor(1);
        }
    }

    void PingPongColor(int x)
    {
        characterRenderer.color = Color.Lerp(Color.white, Color.red, Mathf.PingPong(x * Time.time, 0.5f));
    }

    void FixedUpdate()
    {
        characterRigidBody.MovePosition(
            characterRigidBody.position + direction * velocity * Time.deltaTime
        );

    }

    private void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.gameObject.CompareTag("Death"))
        {
            StartCoroutine(KnockBack(1f, 50, characterDirection));
            DamageColor();
        }
    }

    void CharacterInput()
    {
        direction = Vector2.zero;

        if (Input.GetKey(KeyCode.UpArrow))
        {
            direction += Vector2.up;
            characterDirection = direction;
        }
        if (Input.GetKey(KeyCode.DownArrow))
        {
            direction += Vector2.down;
            characterDirection = direction;
        }
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            direction += Vector2.left;
            characterDirection = direction;
        }
        if (Input.GetKey(KeyCode.RightArrow))
        {
            direction += Vector2.right;
            characterDirection = direction;
        }
    }

    void Animation(Vector2 dir)
    {
        anim.SetLayerWeight(1, 1);

        anim.SetFloat("x", dir.x);
        anim.SetFloat("y", dir.y);
    }

    public IEnumerator KnockBack(float duration, float power, Vector2 direction)
    {
        float time = 0;

        while (duration > time) 
        {
            time += Time.deltaTime;
            characterRigidBody.AddForce(
                new Vector2(direction.x * -power, direction.y * -power), 
                ForceMode2D.Force
            );
        }

        yield return 0;
    }

    void DamageColor()
    {
        toggleColor = true;
        StartCoroutine(ToggleColor());
    }

    IEnumerator ToggleColor()
    {
        yield return new WaitForSeconds(0.5f);
        toggleColor = false;
        characterRenderer.color = new Color(1, 1, 1, 1);
    }
}
